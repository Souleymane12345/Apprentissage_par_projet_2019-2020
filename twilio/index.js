module.exports = function twilio () {

    const accountSid = 'AC46d4c84019c55783e11ff0cee42234c2';
    const authToken = '9b5af3066601efed8ea4c67f0cea6736';
    const client = require('twilio')(accountSid, authToken);

    // Require `PhoneNumberFormat`.
    const PNF = require('google-libphonenumber').PhoneNumberFormat;
    
    // Get an instance of `PhoneNumberUtil`.
    const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

    // Parse number with country code and keep raw input.
    const number = phoneUtil.parseAndKeepRawInput('79261619', 'CI');


    // Format number in the E164 format.
    console.log(phoneUtil.format(number, PNF.E164));

    // add variable to twilio
    let clientNumber = phoneUtil.format(number, PNF.E164);

    //console.log(numb);


    client.messages
    .create({
        body: 'Votre systeme de surveillance ! On détecte des flammes chez vous !',
        from: '+12562914972',
        to: clientNumber
    })
    .then(message => console.log(message.sid));

}