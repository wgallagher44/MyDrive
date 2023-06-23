import React from "react";
import { TextField,Button } from "@mui/material";
import {Stack} from "@mui/material";
export default function ForgotPassword(){

    const sendEmail = () =>{
        var email = document.getElementById("email");
        var sendData = {email:email.value};
        fetch('http://localhost:8000/SendEmail/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sendData)

        })
        .then(response => response.json())
        .then(responseData =>{
            if(responseData.success){
                alert(responseData.message)
            }else{
                alert("There was an error trying to send the email with the link")
            }
        })
    }
    return <div>
        <Stack spacing={4}>
           <TextField id = "email" label = "Email"  variant="outlined"  />
            <Button onClick={sendEmail}>Send Email</Button>
        </Stack>
  
    </div>
}