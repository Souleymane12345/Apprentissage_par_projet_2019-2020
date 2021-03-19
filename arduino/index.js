var SerialPort = require("serialport");
var portArduino = "COM5";
var twilio = require('../twilio/index');
var arduinoSerialPort = new SerialPort(portArduino, { autoOpen: true });
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";
var obj = {
    _id : 0,
    Température : '',
    Humidite : '',
    Detection_de_fumée : '',
    Courant_consommé : '',
    Detection_de_mouvement : ''
}

// Socket.io
function arduino(io) {

    

arduinoSerialPort.on('open', function() {
    
    console.log('Serial Port ' + portArduino + ' est disponible.');
});
io.on('connection', function(socket) {
    // Message à la connexion
    console.log('Connexion socket : Ok');
    console.log("jai deppasser la socket");
    // Le serveur reçoit un message" du navigateur    
    socket.on('boutton_led', function(statut) {
        console.log("statut de la led");
        console.log(statut);
        //socket.emit('boutton_led', 'Veuillez patienter !');
        arduinoSerialPort.write(statut, function(err) {
            if (err) {
                io.sockets.emit('boutton_led', err.boutton_led);
                return console.log('Error: ', err.boutton_led);
            }
        });
    });
});

var done = "";
arduinoSerialPort.on('data', function(data) {
    let buf = new Buffer(data);

    buf2 = buf.toString('ascii')

    done += buf2;


    data_buf2 = done.split('\n');

    obj_list = [];

    for (let index = 0; index < data_buf2.length; index++) {
        line = data_buf2[index];


        try {
            line = line.trim();

            data_buf = line.split(';')


            if (data_buf.length == 5) {

                obj_list.push({
                    'temp_intern_str': data_buf[0],
                    'humid_sol': data_buf[1],
                    'capteur_flamme_str': data_buf[2],
                    'sensorValue_str': data_buf[3],
                    'movement_str': data_buf[4],
                    
                    // 'humid_air': data_buf[3],
                });

            }

            // console.log(typeof data_json)    
        } catch (e) {

        }

    }


    console.log('---------------');

    for (let index = 0; index < obj_list.length; index++) {

        console.log("Température: ", obj_list[index].temp_intern_str);
        console.log("Humidite: ", obj_list[index].humid_sol);
        console.log("Detection de fumée: ", obj_list[index].capteur_flamme_str);
        console.log("Courant consommé: ", obj_list[index].sensorValue_str);
        console.log("Detection de mouvement ", obj_list[index].movement_str);
        
        obj._id = index++;
        obj.Température = obj_list[index].temp_intern_str;
        obj.Humidite = obj_list[index].humid_sol;
        obj.Detection_de_fumée = obj_list[index].capteur_flamme_str;
        obj.Courant_consommé = obj_list[index].sensorValue_str;
        obj.Detection_de_mouvement = obj_list[index].movement_str;
        
        if (obj_list[index].movement_str == '1') {
            twilio();
        } 
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("app2");
        dbo.collection("data").insertOne(obj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });


});

console.log(done);
}

module.exports = arduino;
