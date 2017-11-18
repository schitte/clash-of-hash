var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({
 extended: true
}));

app.use(bodyParser.json());

var teams = ["Coke", "Pepsi", "Beatles", "RollingStones", "PlayStation", "XBOX", "India", "Pakistan", "Marvel", "DC", "Ferrari", "Lamborghini"];

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
     console.log("Response: ", response.balance);
     console.log("Body: ", body.balance);
   }); 
  };
  //fetch data from coinhive
  //add data to firebase 
});

app.listen(process.env.PORT || 8889, function() {
 console.log('Server running on ' + process.env.PORT || 8889);
});
