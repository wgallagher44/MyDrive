const express = require('express')
const cors = require('cors')

const app = express();
require("dotenv").config();
app.use(express.json());

app.use(express.json());
app.use(cors())

app.get('/message', (req,res) =>{
    res.json({message: "Hello from server!"});
});
app.post('/user',(req,res)=>{
   console.log("data Received: ", req.body)

   const responseData = {
    success: true,
    message: 'Data Recived Successfully'
   };
   
   res.json(responseData);
})

app.listen(5000, () =>{
    console.log('Server is running on port 5000')
})