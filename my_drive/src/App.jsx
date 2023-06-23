

import {Link,TextField,Button,Stack} from "@mui/material"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App(){
    let navigate = useNavigate();
    const login = () =>{
        var login_email = document.getElementById("login_email");
        var login_password = document.getElementById("login_password");
        var user = {email:login_email.value,password:login_password.value};
        fetch('http://localhost:8000/loginUser/',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)

        })
        .then(response => response.json())
        .then(responseData =>{
            //console.log(responseData)
            if(responseData.success){
                navigate(`/Drive/?email=${login_email.value}`)
            }else{
                alert("Incorrect Email or Password")
                console.log("Does the user exist: " + responseData.success)
            }
          
        })
        .catch(error => {
            console.error("Error", error)
          })
    }


    return <div>
          
        <Stack spacing={4}>
        <TextField id = "login_email" label = "Email"  variant="outlined"  />
        <TextField id = "login_password" label = "Password"  variant="outlined" type = "password" />
        <Stack direction="row" spacing={10} useFlexGap alignItems="center" justifyContent="space-evenly">
            <Link href="/ForgotPassword" underline="none">Forgot Password</Link>
            <Link href="/CreateAccount" underline="none">Create Account</Link>   
        </Stack>
        <Button onClick={login}>Login</Button>
        
        </Stack>
        
    </div>
}