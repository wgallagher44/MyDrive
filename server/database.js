const  MongoClient= require('mongodb').MongoClient;
const uri = "mongodb+srv://creeksidewill:Pizza331@cluster0.y5n4vwu.mongodb.net/?retryWrites=true";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const dbName = "MyDrive";
var CryptoJS = require("crypto-js");
const key = "659280147772";
const client = new MongoClient(uri);


async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}



  async function insert(User){
   
    try{
    await client.connect()
    const db = client.db(dbName)
    await db.collection('User').insertOne(User);
    }catch(err){
      console.log("Error: " + err)
    }finally{
      await client.close()
    }
     
   
  }
  async function find(search_email){
    
    try{
      await client.connect();
      
    const db = client.db(dbName);
   const val = await db.collection('User').find({email:search_email}).toArray();
   return val;
    }catch(err){
      console.log("Error: " + err)
    }finally{
      await client.close();
    }
 

    
}

async function findUser(search_email,search_password){
  var result;
 // console.log(search_email + " " + search_password)
  try{
    await client.connect();
    const db = client.db(dbName);
    val = await db.collection('User').find({email:search_email}).toArray();
   if(val.length == 0){
 
    result = [];
   }else{
      var password = val[0].password.toString();
      
    var bytes =  CryptoJS.AES.decrypt(password,key);
    var decrypt_password =  bytes.toString(CryptoJS.enc.Utf8)
  
    if(decrypt_password == search_password){

      result = val;
    }else{
      result = [];
    }
   }
  
    }catch(err){
    return [];
    }finally{
      await client.close();
    }
  return result;
}

async function updatePassword(email,newPassword){
    await client.connect();
    var user = await find(email);
    console.log(user)
    if(user.length < 1){
      await client.close();
      return false;
    }else{
       console.log(user[0]._id)
      
         await client.connect();
           const db = client.db(dbName)
         
           const filter = {_id:user[0]._id }
        const update = {$set: {password:newPassword}};
        
       await db.collection('User').updateOne(filter,update)
    
      await client.close();
      return true;
    }
    
}


module.exports = {connect,insert,find,findUser,updatePassword};
