var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://admin:hashatagdev@ds047514.mongolab.com:47514/hashatag';

router.route('/searches').get(function (req, res) {
   MongoClient.connect(url, function(err, db) {
       var collection = db.collection('searches');
       collection.find().toArray(function(err, result) {
           res.status(200);
           res.json(result);
           db.close();
       });
   });
}).post(function (req, res) {
    // Should check if the searchstring is represented in database, add one to count and add a new timestamp.
    // Preferable sorted db, if possible on mongo.
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('searches');
     //   var data = req.body;
     //   data.time = Date.now();

        var string = req.body.txt;
        var match = collection.findOne( { txt : string });

        if(match) {
            console.log(match.txt);
        }

        var matches = collection.find( { "txt" : string}).toArray(function(err, docs){
            console.log(docs.txt);
        });


      //  collection.insert(data, function (err, result) {
      //      res.status(201);
//            res.location(/searches/ + result.insertedIds.toString());

 //           res.json({
    //            "message": "search added"
  //          });
  //      });

        db.close();
    });
});



module.exports = router;