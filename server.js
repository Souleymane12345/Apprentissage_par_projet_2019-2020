let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let indexRouter = require('./route/index');
let dotenv = require('dotenv');
var fs = require('fs');

var https = require('https').createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app);
var url = require('url');
let ard = require('./arduino/index');


dotenv.config();

var io = require('socket.io')(https);



app.use('/assets', express.static('public'));
app.set('view engin','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'hvzuffbuazbf',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

app.use('/', indexRouter);



/*app.listen(process.env.PORT, ()=>{
    console.log('Server on port ' + process.env.PORT);
});*/

 ard(io);
 
//fin ard()
/*
var server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app);*/

https.listen(7560, ()=>{
    console.log("lolol");
});


//module.exports = app;
module.exports = https;


