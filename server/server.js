const express = require('express')
const cors = require('cors')
var CryptoJS = require("crypto-js");
const {Binary} = require('mongodb');
const multer = require('multer');
const fs = require('fs')
const nodemailer = require('nodemailer');
const key = "659280147772";
const app = express();
const mime = require('mime')
const database = require("./database");
const { URLSearchParams } = require('url');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'../my_drive/src/Uploads')
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    }
})


const upload = multer({ storage:fileStorage })
app.use(express.json());

app.use(express.json());
app.use(cors())

app.get('/message', (req,res) =>{
    res.json({message: "Hello from server!"});
});
app.post('/createUser',async (req,res)=>{
    var currentUser = await database.find(req.body.email);
    console.log("length of current user: " + currentUser.length);
    console.log("current user email: " + req.body.email);
    var responseData = {}
    if(currentUser.length != 0){

        responseData = {success: false,message:'User Already Exists'}
    }else{
    var encryptedPassword = CryptoJS.AES.encrypt(req.body.password,key).toString();
    var currentUser = {firstName:req.body.firstName,lastName:req.body.lastName,email:req.body.email,password:encryptedPassword,files:[]};
   await database.insert(currentUser);

    responseData = {
    success: true,
    message: 'Data Received Successfully'
   };
   
    }
    
  
   res.json(responseData);
})

app.post("/loginUser", async (req,res) =>{
    var email = req.body.email;
    var password =req.body.password;
    var data = {}

        await database.connect()
    var user = await database.findUser(email,password);
    console.log(user)
    if(user.length == 0){
        res.status(401).json({message: 'Invalid username or password',success:false})
    }else{
      
        res.json({message:"Login Successful",success:true})
        
    } 
   
    
   

})
app.post('/getAllFiles', async (req,res) =>{
    var user_email = req.body.email;
    var user = await database.find(user_email);
    //const formData = new FormData();
    //console.log(user[0])
    // formData.append('files',user.files)
    res.send({allFiles:user[0].files})

})
app.post("/uploadFile",upload.single("files"), async (req,res) =>{
    var file = req.file;
    console.log(file)
 
    if (!file) {
        return res.status(400).send('No file uploaded.');
      }
   // var fileData = new Binary(Buffer.from(fs.readFileSync(file[0].path)))
    var isUploaded = await database.uploadFiles(file,req.body.email,req.body.date);
    console.log(isUploaded)
  // fs.unlinkSync(file[0].path);
    res.json({status:"files received"})

})
app.post("/ResetPassword", async (req,res) =>{
    var email = req.body.email;
    var encryptedPassword = CryptoJS.AES.encrypt(req.body.password,key).toString();
   var doesUpdate = await database.updatePassword(email,encryptedPassword);
   if(doesUpdate){
     res.json({message:"Password Was Successfully Reset ",success:true})
   }else{
    res.json({success:false,message:"No account Associated with this email"})
   }
   
})

app.post("/SendEmail", (req,res) =>{
    console.log(req.body.email);
    var transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        port:465,
        secure:true,
        auth: {
            user:'mydrive3456@gmail.com',
            pass:"mednajzjdhptkxkf"
        }


    });
    var mailOptions = {
        from: "mydrive3456@gmail.com",
        to: req.body.email,
        subject: 'Reset Password for mydrive',
        text: `Use this link to reset your password \n https://wgallagher44.github.io/ResetPassword/?email=${req.body.email}`
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log('error occurred' +error.message);
           res.json({message:error,success:false})
        }else{
            console.log("Email Successfully sent")
            res.json({message:`The Link to reset your password was sent to ${req.body.email}`,success:true});
        }
    })
})
app.post("/DeleteFile", async (req,res) =>{

        var idx = req.body.idx
    var result =  await database.deleteFile(idx,req.body.email);

    res.json({success:result})


})

app.post("/DeleteMultiple", async (req,res)=>{
        var idxs = req.body.deleted_idx;
        var email = req.body.email;
        console.log(req.body)
    for(let i = 0; i < idxs.length; i++){
        await database.deleteFile(idxs[i],email);
    }

})
//need to rename files in the upload folder 


app.post("/RenameFile", async (req,res) =>{
    var email = req.body.email;
    var newFileName = req.body.newFileName;
    var idx = req.body.fileIdx;
    var result = await database.renameFile(idx,email,newFileName)
    res.json({success:result})

})
app.get("/Download/:data", async (req,res)=>{
    const dataReceived = req.params.data;
   const parsedData = Object.fromEntries(new URLSearchParams(dataReceived))
    
       // console.log(req.body)
        var email = parsedData.email;
        var idx = parsedData.idx
       // console.log(idx)
        var file = await database.getSingleFile(idx,email);
        console.log(file)
        const filePath = file.path;
        const fileName = file.originalname;
        res.setHeader('Content-Type',file.mimetype)
         const fileStream = fs.createReadStream('./uploads/'+fileName)
        fileStream.pipe(res)
    //     res.download(')
       // res.json({path:filePath,fileName:fileName})

})
app.get("/MultipleDownload/:data", async (req,res) =>{
    const dataReceived = req.params.data;
    const parsedData = Object.fromEntries(new URLSearchParams(dataReceived));
    var email = parsedData.email;
    var idxs = parsedData.idxs;
    
   var files = await database.getDownloadFiles(idxs,email);
    var filePaths = []
   for(let i = 0; i < files.length; i++){
        var fileName = files[i].file.filename;
        var filePath = '/uploads/'+fileName;
        filePaths.push(filePath);
        console.log(i + " " );
        console.log(files[i].file.filename)
   }
   //send urls of the file to the frontend 
   res.json({filePaths:filePaths})


})

app.listen(8000, () =>{
    console.log('Server is running on port 8000')
})

