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
async function getFiles(email){
    
    var user = await find(email);
    if(user.length == 0){
      return [];
    }else{
      console.log(user)
      return user[0].files;
    }
    
    
}
async function getDownloadFiles(idxs,email){
    var result = [];
    var arrayOfIdx = idxs.split(',')
    var user = await find(email)
    var files = user[0].files
    arrayOfIdx.forEach(element => {
      var idx = parseInt(element,10);

     result.push(files[idx])
    })
   
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

// async function resetFiles(){
//   await client.connect();
//   var db = client.db(dbName);
//   const collection = db.collection('User');
//   await collection.updateMany({},{$set: {files:[]}})
// }
//  resetFiles()
async function uploadFiles(file,user_email,uploadDate){
    
      var user = await find(user_email);
      try{
          await client.connect();
          
        
          const db  = client.db(dbName);
          const uploadData = {file:file,date:uploadDate}
          const filter = {_id:user[0]._id}
          const update = {$push: {files:uploadData}};
          await db.collection('User').updateOne(filter,update);
          

      }catch(err){
        console.log(err);
        return false;
      }finally{
        await client.close();
      }
      return true;

}
async function getAllFiles(email){
    var user = await find(email);
    var files = user[0].files
    if(files.length < 1){
      return [];
    }else{

    }
    
}

async function deleteFile(idx,email){
   var user = await find(email); 
  
  try{
   await client.connect();
  
    const filter = {_id:user[0]._id};
    const db = client.db(dbName);
  
    const delete_file = {$unset: {[`files.${idx}`]:1} };
   

    const result =await db.collection('User').updateOne(filter,delete_file);
    await db.collection('User').updateOne(filter,{$pull:{"files":null}})
   

  }catch(err){
    console.error(err)
    return false;
  }finally{
    await client.close()
  }
  return true;


}
async function renameFile(idx,email,fileName){
  try{
     var user = await find(email);
  var file = user[0].files[idx].file;
  var filter = {_id:user[0]._id};
  var date = user[0].files[idx].date
  console.log(file)
  file.originalname = fileName
  console.log(file)
  await client.connect()
  var updateName = {file:file,date:date}
  const db = client.db(dbName);
  const updateFile = {$set : {[`files.${idx}`]:updateName}}
 await db.collection('User').updateOne(filter,updateFile)
  }catch(err){
      return false
  }finally{
   await client.close();
  }
 return true;




}

async function getSingleFile(idx,email){
  var user = await find(email);
  console.log(user)
  console.log(user)
 var file = user[0].files[idx].file;
 console.log(file)

 return file;

}
//getAllFiles("creeksidewill@gmail.com")
//getSingleFile(0,'creeksidewill@gmail.com')
//renameFile(0,'creeksidewill@gmail.com','newName.docx')

module.exports = {getDownloadFiles,connect,insert,find,findUser,updatePassword,uploadFiles,deleteFile,renameFile,getSingleFile};
