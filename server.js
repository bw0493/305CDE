// type node myserver.js via SSH Terminal in this container to start
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
    var fs, http, qryStr, server, url;

    http = require('http');

    url = require('url');

    qryStr = require('querystring');

    fs = require('fs');

    server = http.createServer(function(req, res) {
        var action, form, formData, msg, publicPath, urlData, stringMsg;
        urlData = url.parse(req.url, true);
        action = urlData.pathname;
        publicPath = __dirname + "\\public\\";
        console.log("requesting url: " + req.url);

    var loginFlag = false;
    var userid = "";
    var username = "";

        if (action === "/Register") {
            if (req.method === "POST") {
                console.log("POST on register page");
                formData = '';
                msg = '';
                return req.on('data', function(data) {
                    formData += data; // pass data from the webpage form
                    console.log("register form data = " + formData);
                    return req.on('end', function() {
                        var user;
                        user = qryStr.parse(formData);
                        user.id = "_"+ Math.random().toString(10).substr(2,8); // .random value is usually (0.xxxxxx), toString(10) gives 0-9, substr cut the number
                        console.log("generated id = " + user.id);

                        var splitMsg = formData.split("&");
                        console.log("splitMsg[1] = " + splitMsg[1]);

                        var splitEmail =  splitMsg[1].split("=");
                        console.log("splitEmail[1] = " + splitEmail[1]);
                        var RevSplitEmail = decodeURIComponent(splitEmail[1]);
                        console.log("RevSplitEmail = "+RevSplitEmail);

                        var query = { "id" : user.id };
                        var strQuery = JSON.stringify(query);
                        console.log("converted strQuery = " + strQuery);
                        var ObjQuery = JSON.parse(strQuery);
                        console.log("converted ObjQuery = " + ObjQuery);

                        msg = JSON.stringify(user); //convert JSON Object to string
                        console.log("converted msg = " + msg);
                        stringMsg = JSON.parse(msg); //convert string to JSON Object
                        console.log("converted stringMsg = " + stringMsg);

                            MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
                                if (err) throw err;
                                var dbo = db.db("mydb");

                                dbo.collection("users").countDocuments({"email":RevSplitEmail}, function(err, count){
                                    console.log(err, count);
                                    finalcount = count;
                                        if (finalcount > 0) {
                                            if (err) throw err;
                                            console.log("user already exist");
                                            db.close();
                                            return res.end("fail");
                                        } 
                                        else {
                                            dbo.collection("users").insertOne(stringMsg, function(err, res) {
                                                if (err) throw err;
                                                console.log("1 document inserted in users");
                                            });

                                            dbo.collection("users").updateOne(ObjQuery, {$set : { faves:[] }}, function(err, res) {
                                                if (err) throw err;
                                                console.log("1 document updated in users");
                                                db.close();
                                            });
                                        }        
                                    });
                            });
                            return res.end("good");
                    });
                });
            } else {
                    sendFileContent(res, "Register.html", "text/html"); // basically do nothing
            } // register actions end here
        } else if (action === "/Login") {
            if (req.method === "POST") {
                console.log("POST on login page");
                formData = '';
                msg = '';
                return req.on('data', function(data) {
                    formData += data; // assign "data" pass from the page to formData
                    console.log("login form data = " + formData);
                    return req.on('end', function() {
                      var user;
                        user = qryStr.parse(formData); // converting to an object
                        msg = JSON.stringify(user);
                        console.log("credential = " + msg);
                        stringMsg = JSON.parse(msg);

                        MongoClient.connect(dbUrl, { useNewUrlParser: true}, function(err, db) {
                            if (err) throw err;
                            var dbo = db.db("mydb");

                            dbo.collection("users").findOne(stringMsg, { id:1, name:1 },function(err, result) {
                            if (err) throw err;
                                db.close();
                                console.log(JSON.stringify(result) + " " + new Date());
                                var myresult = JSON.stringify(result);
                                    userid = JSON.parse(myresult).id;
                                    console.log("userid from login query = " + userid);
                                    return res.end(JSON.parse(myresult).id); //pass id to client side for
                            });

                        });
                    });
                });
            } else {
                form = "Login.html";
                return fs.readFile(form, function(err, contents) {
                    if (err !== true) {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        return res.end(contents);
                    } else {
                        res.writeHead(500);
                        return res.end;
                    }
                });
            } // login actions end here
        }

    else if(action === "/faves"){
      form = "faves.html";
                return fs.readFile(form, function(err, contents) {
                    if (err !== true) {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        return res.end(contents);
                    } else {
                        res.writeHead(500);
                        return res.end;
                    }
                });
    }

    else if (action === "/getFaves") {
        form = "faves.html";

        var Cookies = {};
          req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
          });

        console.log(Cookies);
        msg = JSON.stringify(Cookies);
        console.log(msg);
        var locId = msg.substring(7,16);
        console.log("userid: " + locId);
        stringMsg = locId;
        console.log("stringMsg= "+ locId);

          MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var query = { id: stringMsg };
            console.log("query = "+ JSON.stringify(query));

            dbo.collection("users").find(query, { faves:1 }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.end(JSON.stringify(result[0].faves));
                db.close();
            });

          });

    } else if (action ==="/addFaves"){
      if (req.method === "POST") {
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          console.log("addFaves form data = " + formData);

          return req.on('end', function() {
            var splitMsg = formData.split("&");
            console.log("splitMsg = " + splitMsg);
            var respondMsg;

              MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {

                if (err) throw err;
                var dbo = db.db("mydb");

                var ObjId = { "id" : splitMsg[0] };
                var ObjFaves = { "faves" : splitMsg[1] };

                console.log("ObjId = "+ObjId + " , ObjFaves = "+ObjFaves);

                  dbo.collection("users").updateOne(ObjId, { $addToSet: ObjFaves }, function(err, res) {
                    if (err) throw err;
                    console.log("push error = "+err);
                    console.log("push result = "+res);
                    var dbResult = JSON.stringify(res);
                    console.log("converted push result = "+JSON.stringify(res));
                    
                    var ObjKey2 = JSON.parse(res); //weird behaviour, started as a JSON String
                    console.log("Converted ObjKey2 = "+ObjKey2);
                    db.close();
                    console.log("ObjKey2.nModified = " + ObjKey2.nModified);
                    console.log("Converted ObjKey2.nModified = " + JSON.stringify(ObjKey2.nModified));
                    
                        if (ObjKey2.nModified === 1) {
                            console.log("fave inserted");
                            respondMsg = "insert success";
                            console.log("respondMsg = "+respondMsg);
                        } else {
                            console.log("fave existed");
                            respondMsg = "insert failed";
                            console.log("respondMsg = "+respondMsg);
                        }
                });
                  return res.end(respondMsg);
                  console.log("console respondMsg = "+respondMsg);
//return res.end("parser really error?");
              });
          });
        });
//return res.end("fail");
      }
      else { console.log("no user detected."); }

    } else if (action ==="/delFaves"){
      if (req.method === "POST") {
            formData = '';
            msg = '';
        return req.on('data', function(data) {
            formData += data;
            console.log("delFaves form data = " + formData);
          return req.on('end', function() {
            var splitMsg = formData.split("&");
            console.log("splitMsg[1] = " + splitMsg[1]);

              MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var ObjId = { "id" : splitMsg[0] };
                var ObjFaves = { "faves" : splitMsg[1] };
                console.log("converted ObjId = "+JSON.stringify(ObjId) + " , converted ObjFaves = "+JSON.stringify(ObjFaves));
                console.log("ObjId = "+ObjId + " , ObjFaves = "+ObjFaves);

                var ObjUpdate;
                var ObjFilter;

                    if (splitMsg[1]==="all") {
                        ObjUpdate = { $set : { faves:[] } };
                        ObjFilter = ObjId;
                        console.log("setting faves to empty, ObjUpdate = "+JSON.stringify(ObjUpdate));
                        } else {
                            ObjUpdate = { $pull : ObjFaves };
                            ObjFilter = { $and: [ ObjId , { faves: { $in: [splitMsg[1]] } } ] }
                            }

                    dbo.collection("users").findOneAndUpdate(ObjFilter, ObjUpdate, function(err, res) {
                        console.log("pull error = "+err);
                        console.log("pull result = "+res);
                        console.log("converted pull result = "+JSON.stringify(res));
                        var ObjKey = res;
                        if (err) {
                            console.log("pull error = "+err);
                            throw err;
                        }
                        db.close();

                    });

              });
 return res.end("success");
          });
        });
return res.end("fail");
      }
      else { console.log("no user detected."); }

    } else if (action ==="/index") {
      if (req.method === "POST") {
          console.log("action = POST on index page");
          formData = '';
          msg = '';
                return req.on('data', function(data) {
            formData += data;
            console.log("form data= " + formData);
                return req.on('end', function() {
                  var user;
                  //var stringMsgLike = "/"+ formData + "$/";
                  stringMsg = formData;
                  console.log("stringMsg: " + stringMsg);

                  MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
                    var finalcount;
                    if (err) throw err;
                    var dbo = db.db("mydb");
                    //dbo.collection("drugs").find({"keyword": splitMsg[1]}, {
              //dbo.collection("drugs").createIndex( { name: "text" } );
              dbo.collection("drugs").createIndex({ "$**": "text" });
              //dbo.collection("drugs").ensureIndex({ name: 'text', description : 'text'});
              //dbo.collection("drugs").find({ description: { $regex: stringMsgLike } }).toArray(function(err, result) {
              dbo.collection("drugs").find({ $text: { $search: stringMsg } }).toArray(function(err, result) {
                      if (err) throw err;
                      //console.log("result: " + result);
                      db.close();
                      var resultReturn = JSON.stringify(result);
                      console.log("return: " + resultReturn);
                      return res.end(resultReturn);
                    });
              /*
              dbo.collection("drugs").find({"name": stringMsg}, {
                      "_id": 0,
                      "name": 1,
                      "description": 1
                    }).toArray(function(err, result) {
                      if (err) throw err;
                      //console.log("result: " + result);
                      db.close();
                      var resultReturn = JSON.stringify(result);
                      console.log("return: " + resultReturn);
                      return res.end(resultReturn);
                    });
              */
                  });
                });
              });
            } else {
              form = "index.html";
              return fs.readFile(form, function(err, contents) {
                if (err !== true) {
                  res.writeHead(200, {
                    "Content-Type": "text/html"
                  });
                  return res.end(contents);
                } else {
                  res.writeHead(500);
                  return res.end;
                }
              });
            }
    }
     else {
                sendFileContent(res, "index.html", "text/html"); // default case
        }
  });

    server.listen(9999);
    console.log("Server is running on: " + new Date());

    function sendFileContent(response, fileName, contentType) {
        fs.readFile(fileName, function(err, data) {
            if (err) {
                response.writeHead(404);
                response.write("Not Found! error: "+ err);
            } else {
                response.writeHead(200, {'Content-Type': contentType});
                response.write(data);
            }
            response.end();
        });
    }

  function getCookie(cname) {
    var name = cname + "=";
    //var decodedCookie = decodeURIComponent("http://port-9999.wwlb_305cde-177370493790498.codeanyapp.com/index".cookie);
    var decodedCookie = decodeURIComponent(
      "http://127.0.0.1:9999/index".cookie);

    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
  }
}).call(this);
