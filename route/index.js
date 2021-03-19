let express = require('express');
let router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";
let tab;


router.get('/', (req,res)=>{
    res.render('Login.ejs');
});

router.get('/home', (req,res,next)=>{
    res.render('index.ejs', { nameComponent : 'home.ejs'});
});

router.get('/facture', (req,res,next)=>{
    let element;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("app2");
        dbo.collection("data").find({}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          //tab = result[];
          console.log(result.length);
          let p = Number(result.length-1)
          tab = result[p]['Courant_consommé'];
          console.log(tab);
          
          db.close();
        });
      });
      
      
      //let price = 
    res.render('index.ejs', { nameComponent : 'facture.ejs', valeur : tab});
});
/*
router.get('/statistique', (req,res,next)=>{

  


    res.render('index.ejs', { nameComponent : 'statistique.ejs'});
});*/

router.post('/login', (req,res,next)=>{
    if (req.body.username == "admin01" && req.body.password == "0101") {
        console.log("auth connected !");
        res.render('index.ejs',{ nameComponent : 'home.ejs', name : 'Mohamed'});
    }
});

router.post('/logout', (req,res)=>{
    res.redirect('/');
});
module.exports = router;