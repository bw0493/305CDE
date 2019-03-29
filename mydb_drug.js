// this file add, update, read a drug database
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, { useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
  dbo.collection("drugs").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
/*
  dbo.collection("drugs").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
  
  dbo.createCollection("drugs", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  
  dbo.collection("drugs").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
  */
/*
//structure your data here
    var newObj = [
        {
            name:'abc',
            description: ['haha', 'sasa', 'gaga'],
            risk:[ head:"big", neck:"broke", body:"paralyzed"]            
        }
    ];
*/   
/*
    var myobj = [
        {
          name: 'MARIJUANA',
          description: 'Blunt, dope, ganja, grass, herb, joint, bud, Mary Jane, pot, reefer, green, trees, smoke, sinsemilla, skunk, weed',
          risks: 'Cough; frequent respiratory infections; possible mental health decline; addiction'
        },
        {
          name: 'HASHISH',
          description: 'Boom, gangster, hash, hash oil, hemp',
          risks: 'Cough; frequent respiratory infections; possible mental health decline; addiction'
        },
        {
          name: 'HEROIN',
          description: 'Diacetylmorphine: smack, horse, brown sugar, dope, H, junk, skag, skunk, white horse, China white; cheese',
          risks: 'Constipation; endocarditis; hepatitis; HIV; addiction; fatal overdose'
        },
        {
          name: 'OPIUM',
          description: 'Laudanum, paregoric: big O, black stuff, block, gum, hop',
          risks: 'Constipation; endocarditis; hepatitis; HIV; addiction; fatal overdose'
        },
        {
          name: 'COCAINE',
          description: 'Cocaine hydrochloride: blow, bump, C, candy, Charlie, coke, crack, flake, rock, snow, toot',
          risks:  'Constipation; endocarditis; hepatitis; HIV; addiction; fatal overdose; nasal damage from snorting'
        },
        {
          name: 'AMPHETAMINE',
          description: 'Biphetamine, Dexedrine: bennies, black beauties, crosses, hearts, LA turnaround, speed, truck drivers, uppers',
          risks: 'Weight loss; insomnia; cardiac or cardiovascular complications; stroke; seizures; addiction; severe dental problems'
        },
        {
          name: 'METHAMPHETAMINE',
          description: 'Desoxyn: meth, ice, crank, chalk, crystal, fire, glass, go fast, speed',
          risks: 'Weight loss; insomnia; cardiac or cardiovascular complications; stroke; seizures; addiction;'
        },
        {
          name: 'MDMA',
          description: 'Ecstasy, Adam, clarity, Eve, lovers-speed, Molly, peace, uppers',
          risks: 'sleep disturbances; depression; impaired memory; hyperthermia; addiction'
        },
        {
          name: 'FLUNITRAZEPAM',
          description: 'Rohypnol (date rape drug): forget-me pill, Mexican Valium, R2, roach, Roche, roofies, roofinol, rope, rophies',
          risks: 'addiction'
        },
        {
          name: 'GHB',
          description: 'Gamma-hydroxybutyrate: G, Georgia home boy, grievous bodily harm, liquid ecstasy, soap, scoop, goop, liquid X',
          risks: 'unconsciousness; seizures; coma'
        }, {
          name: 'KETAMINE',
          description: 'Ketalar SV: cat Valium, K, Special K, vitamin K',
          risks: 'Anxiety; tremors; numbness; memory loss; nausea'
        },
        {
          name: 'PCP AND ANALOGS',
          description: 'Phencyclidine: angel dust, boat, hog, love boat, peace pill',
          risks: 'Anxiety; tremors; numbness; memory loss; nausea'
        },
        {
          name: 'SALVIA DIVINORUM',
          description: 'Salvia, Shepherdess’s Herb, Maria Pastora, magic mint, Sally-D',
          risks: 'Anxiety; tremors; numbness; memory loss; nausea'
        },
        {
          name: 'DEXTROMETHORPHAN',
          description: 'Robotripping, Robo, Triple C',
          risks: 'Anxiety; tremors; numbness; memory loss; nausea'
        },
        {
          name: 'LSD',
          description: 'Lysergic acid diethylamide: acid, blotter, cubes, microdot, yellow sunshine, blue heaven',
          risks: 'Flashbacks, Hallucinogen Persisting Perception Disorder'
        },
        {
          name: 'MESCALINE',
          description: 'Buttons, cactus, mesc, peyote',
          risks: 'Flashbacks, Hallucinogen Persisting Perception Disorder'
        },
        {
          name: 'PSILOCYBIN',
          description: 'Magic mushrooms, purple passion, shrooms, little smoke',
          risks: 'Flashbacks, Hallucinogen Persisting Perception Disorder'
        }
      ];

  dbo.collection("drugs").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
*/  
  //db.collection.getIndexes()
  //db.getCollection("drugs").getIndexes()
});