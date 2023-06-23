const express = require('express')
const cors = require('cors')
var CryptoJS = require("crypto-js");

const nodemailer = require('nodemailer');
const key = "659280147772";
const app = express();
const database = require("./database");
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
    var currentUser = {firstName:req.body.firstName,lastName:req.body.lastName,email:req.body.email,password:encryptedPassword};
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


app.listen(8000, () =>{
    console.log('Server is running on port 8000')
})
