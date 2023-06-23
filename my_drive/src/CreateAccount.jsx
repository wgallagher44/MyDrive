
import React from "react";
import {Button,TextField,Stack,List,ListItem} from '@mui/material'
import "./createAccount.css"
import {useState,useEffect,useRef} from 'react'
import { useNavigate } from "react-router-dom";
function CreateAccount() {
  const [error,setError] = useState(false);
  const [duplicate_user,setIsDuplicate]  =useState(false)
  const [duplicate_user_text,setDuplicate] = useState("")
  const [error_cof,setErrorCof] = useState(false);
  const [helperText_cof,setCofHelperText] = useState("");
  const [helperText,setHelperText] = useState("");
 let [disabled,setDisabled] = useState([true,true,true,true,true,true])
 const [allGreen,setIsGreen] = useState([true,true,true,true,true])
  let navigate = useNavigate();
  const userInputted = (val,e) =>{
      setIsDuplicate(false)
    const passwordCheck = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
    const currentValue = e.target.value;
    const updatedDisabled = [...disabled];
    if(val == 3){
       const updatedPasswordCheck = [...allGreen];
      styleCondition(1,/(?=.{8,})/,currentValue,updatedPasswordCheck)
      styleCondition(2,/(?=.*[a-z])/,currentValue,updatedPasswordCheck)
      styleCondition(3,/(?=.*[A-Z])/,currentValue,updatedPasswordCheck)
      styleCondition(4,/(?=.*[^A-Za-z0-9])/,currentValue,updatedPasswordCheck)
      styleCondition(5,/(?=.*[0-9])/,currentValue,updatedPasswordCheck)
     

      if (currentValue !== "") {
        updatedDisabled[val] = false;
      } else {
        for (let i = 0; i < updatedDisabled.length; i++) {
          if (i === val) {
            updatedDisabled[i] = true;
          } else {
            updatedDisabled[i] = false;
          }
        }
      }
        let isFalse = false;
        for(let i = 0; i < updatedPasswordCheck.length; i++){
            if(updatedPasswordCheck[i]){
              isFalse = true;
              break;
            }
        }
      updatedDisabled[5] = isFalse;
      setDisabled(updatedDisabled);
    }else{
       if (currentValue !== "") {
      updatedDisabled[val] = false;
    } else {
      for (let i = 0; i < updatedDisabled.length; i++) {
        if (i === val) {
          updatedDisabled[i] = true;
        } else {
          updatedDisabled[i] = false;
        }
      }
    }
  setDisabled(updatedDisabled);
    }
   
    
  };
  
  const styleCondition = (idx,regx,value,array) =>{
    if(value.match(regx)){
      let lowerLetter = document.getElementById(`list-item${idx}`)
      lowerLetter.style = "color:green";
      array[idx-1] = false;
     }else{
      let lowerLetter = document.getElementById(`list-item${idx}`)
      lowerLetter.style = "color:red";
     }
     setIsGreen(array)
  }

  
  const checkDisabled = (disabled) =>{
    for(let i = 0;i<disabled.length; i++){
      if(disabled[i]){
        return true;
      }

    }
    return false;
  }
  
 
  
  const signUp = () =>{
    let password_Element = document.getElementById("password");
    let cofPassword_Element = document.getElementById("confPassword");
    let password = password_Element.value;
    let cofPassword = cofPassword_Element.value;
    if(password !== cofPassword){
      setErrorCof(true);
      setCofHelperText("Passwords Don't Match Try Again")
     cofPassword_Element.value = "";
     setDisabled([false,false,false,false,true])
    }else{
         var first = document.getElementById('first').value
         var last = document.getElementById("last").value;
            var email = document.getElementById("email").value;
               var curr_password = document.getElementById("password").value;
      const user = {firstName:first,lastName: last,email:email,password:curr_password};
      fetch('http://localhost:8000/createUser/',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(response =>response.json())
      .then(responseData =>{
          console.log("Response from server " ,responseData)
          console.log(responseData.success)
          if(!responseData.success){
            setIsDuplicate(true);
            setDisabled("A User Is Already Associated with this Email please try a different email")
            document.getElementById('email').value = "";

          }else{
            setIsDuplicate(false);
            navigate("/")
            
          }
      })
      .catch(error => {
        console.error("Error", error)
      })
    }

  }
  return (
    <div >
        <Stack spacing={4}>
           <TextField id = "first" label = "First Name"  variant="outlined" onInput={(event) =>userInputted(0,event)}  />
           <TextField id = "last" label = "Last Name" onInput={(event) =>userInputted(1,event)}  />
           <TextField id = "email" label = "Email" onInput={(event) =>userInputted(2,event)} error = {duplicate_user} helperText = {duplicate_user_text}/>
           <TextField id = "password" label = "Password" type="password" error = {error} helperText = {helperText} onInput={(event) =>userInputted(3,event)} />
           <List sx={{ listStyleType: 'disc' }} id = "list-item">
            <ListItem id= "list-item1"    sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} > At Least 8 Characters </ListItem>
            <ListItem id= "list-item2"    sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} > At Least One Lowercase Letter</ListItem>
       <ListItem id= "list-item3"    sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} > At Least One Uppercase Letter</ListItem>
            <ListItem id= "list-item4"   sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} >At Least One Special Character</ListItem>
     <ListItem id= "list-item5"   sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} >At Least One Number </ListItem>
           </List>
           <TextField id = "confPassword" label = "Confirm Password" type ="password" error = {error_cof} helperText = {helperText_cof} onInput={(event) =>userInputted(4,event)}/>
           <Button variant = "text" onClick={signUp} disabled ={checkDisabled(disabled)}  id = "signUp" >Sign Up</Button>
        </Stack>
       
   

    </div>
  );

  }
export default CreateAccount;
