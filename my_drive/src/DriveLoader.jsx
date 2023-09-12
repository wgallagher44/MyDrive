import React from "react";
import Drive from "./Drive";
import { useState,useEffect } from "react";
export default function DriveLoader(){
    const [isLoading,setIsLoading] = useState(true)
    const [savedFiles,setSavedFiles] = useState([]);
    var url = window.location.href;
console.log(url);
let count = 0;
let email = "";
    for(let i = 0; i < url.length; i++){
        if(url.charAt(i) == '='){
          count++;
          break;
        }else{
          count++;
        }
    }
    for(let i = count; i < url.length; i++){
        email += url.charAt(i);
    }


  useEffect(()=>{
    var user_email = {email:email}
    fetch("http://localhost:8000/getAllFiles/",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(user_email)
    }).then(response =>response.json())
    .then(responseData =>{
    setSavedFiles(responseData.allFiles);
    setIsLoading(false)
          
    })
    .catch(error => {
      console.error("Error", error)
    })
   
      

  },[]);
    if(isLoading){
        return <div>Loading...</div>
    }
    return <Drive files = {savedFiles} />

}