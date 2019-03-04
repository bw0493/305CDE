// one command at the time
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
    var myquery = {"id" : "_86857030"};
/* use this block to delete and confirm the deletion
	dbo.collection("users").deleteOne(myquery, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted: " + obj);
		db.close();
	});
	
	dbo.collection("users").find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		db.close();
	});
use this block to delete and confirm the deletion */ 
  
  
  var myfaves = { fid:'testid', fname: 'fav_drug'}; 
  var favObj = ["key1"];
  
  //dbo.collection("users").updateOne({"id" : "_51898129"},{$set : {myfaves}}); //failed, makes nested object
  //dbo.collection("users").updateOne({"id" : "_51898129"},{$set : {fid:'testid', name: 'fav_drug'}});
  
  var fav = {faves:[]}; 
  //dbo.collection("users").updateOne(myquery, {$set : fav}); //this line add a field to a user row with an empty array
  
/*
  // use $push to push value in, it pushes "drug3" into the "faves" array
  dbo.collection("users").updateOne(myquery,{ $push: { faves: "drug3" } });
  dbo.collection("users").updateOne(myquery,{ $push: { faves: "drug2" } });
  dbo.collection("users").updateOne(myquery,{ $push: { faves: "drug1" } });
*/
  
  // use $pull to pop value out, it pulls any existing "drug1" out of the "faves" array
  //dbo.collection("users").updateOne(myquery,{ $pull: { faves: "drug1" } }); 
  
  // use $unset to remove field(s)
  //dbo.collection("users").updateOne(myquery, {$unset : fav});

/*
  //var newvalues = { $pull: {myfaves} }; //pull is for records - items in faves object
  var newvalues = { $pull: 
                   {faves: 
                    {$in: "drug2"}
                   }
                  }; //pull is for records - things in faves object
  var specificValue = "drug2";
  dbo.collection("users").updateOne(myquery, { $pull: 
                   {faves: 
                    {$in: specificValue}
                   }
                  }, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });  
*/
    //Show
    
    dbo.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    });

/*
    dbo.collection("faves").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    });
*/    
    //Drop
/*
    dbo.dropCollection("users", function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
    dbo.dropCollection("faves", function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    }); 
*/
    //Create
/*
	dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("users Collection created!");
        db.close();
    });
    dbo.createCollection("faves", function(err, res) {
        if (err) throw err;
        console.log("faves Collection created!");
        db.close();
    });
*/

});