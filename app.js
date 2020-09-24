
//jshint esversion:6

const { MongoClient } = require("mongodb");
const assert = require("assert");
// Connection URI
const uri =
  "mongodb://localhost:27017";

const dbName='fruitDB';

// Create a new MongoClient
const client = new MongoClient(uri,{useUnifiedTopology:true});


    // Connect the client to the server
  client.connect(err=>{
    assert.equal(null,err);
    console.log("Connected successfully to mongodb server");
    const db = client.db(dbName);
    // insertDocuments(db,()=>{
    //       client.close();
    // });
    findDocuments(db,()=>{
          client.close();
    });
  });


  const insertDocuments = (db,callback)=>{
    const collection = db.collection('fruits');
    collection.insertMany(
      [
        {
          name:"Apple",
          score:8,
          review:"Great fruit"
        },
        {
          name:"Banana",
          score:9,
          review:"Exellent taste"
        },
        {
          name:"Orange",
          score:6,
          review:'Sour stuff'
        }
      ],(err,result)=>{
        assert.equal(err,null);
        assert.equal(3,result.result.n);
        assert.equal(3, result.ops.length);
      }
    );
  };

const findDocuments = (db,callback)=>{
  const collection = db.collection('fruits');
  collection.find({}).toArray((err,docs)=>{
    assert.equal(err,null);
    console.log("Found following records");
    console.log(docs);
    callback(docs);
  });
};
