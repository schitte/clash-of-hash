var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "clashofhash-841f6",
    clientEmail: "firebase-adminsdk-qec66@clashofhash-841f6.iam.gserviceaccount.com",
    privateKey: JSON.parse(process.env.FB_KEY)
  }),
  databaseURL: "https://clashofhash-841f6.firebaseio.com"
});

var db = admin.database();

app.use(bodyParser.urlencoded({
 extended: true
}));

app.use(bodyParser.json());

var teams = ["Coke", "Pepsi"];
//var teams = ["Coke", "Pepsi", "Beatles", "RollingStones", "PlayStation", "XBOX", "India", "Pakistan", "Marvel", "DC", "Ferrari", "Lamborghini"];

app.get('/test', function (req, res) {
 res.send('null');
});

app.get('/ping', function (req, res) {
  //monitor pings here every hour.
  for(var i=0; i < teams.length; i++) {
   request.get("https://api.coinhive.com/user/balance", {
    qs: {
      name: teams[i],
      secret: process.env.HIVE_SECRET
    }
   }, function(error, response, body) {
    if(error) {
     console.log("Hive Error: ", error);
    } else {
     console.log("Balance: ", JSON.parse(body).balance);
    };
   }); 
  };
  //fetch data from coinhive
  //add data to firebase 
});

app.listen(process.env.PORT || 8889, function() {
 console.log('Server running on ' + process.env.PORT || 8889);
});
