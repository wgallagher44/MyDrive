// import React from "react";
// import { useState,useEffect } from "react";
// import { useNavigation,createSearchParams } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

// export default function Loading(){
// //     const [tableData,setTableData] = useState([]);
// //     const [savedFiles,setSavedFiles] = useState([]);
// //     const [isDisabled,setDisabled] = useState(true)
// //     const navigate = useNavigation();
// //     var url = window.location.href;
// // console.log(url);
// // let count = 0;
// // let email = "";
// //     for(let i = 0; i < url.length; i++){
// //         if(url.charAt(i) == '='){
// //           count++;
// //           break;
// //         }else{
// //           count++;
// //         }
// //     }
// //     for(let i = count; i < url.length; i++){
// //         email += url.charAt(i);
// //     }
// //     const rowCheck = () =>{
// //         var rows = document.getElementById("fileTable").rows
    
// //        for(let i = 1; i < rows.length; i++){
// //          var curr_checkBox = document.getElementById(`rowCheckBox${i}`)
       
// //          if(curr_checkBox.checked){
// //           setDisabled(false)
// //           return;
// //          }
// //          }
// //       setDisabled(true)
    
    
// //     } 
// //     useEffect(()=>{
// //       var user_email = {email:email}
// //       fetch("http://localhost:8000/getAllFiles/",{
// //         method:'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body:JSON.stringify(user_email)
// //       }).then(response =>response.json())
// //       .then(responseData =>{
// //           //console.log("Line 80")
// //           setSavedFiles(responseData.allFiles);
// //           console.log(responseData.allFiles)
            
// //       })
// //       .catch(error => {
// //         console.error("Error", error)
// //       })
     
// //         var result = [];
// //       for(let i = 0; i < savedFiles.length; i++){
// //         var current_file = savedFiles[i].file;
// //         var date_uploaded = savedFiles[i].date;
// //         var result_size = ""
// //       var size = current_file.size;
// //       const size_kb = Math.ceil( size / 1000)
// //       if(size_kb > 1000){
// //         const size_mb = Math.ceil(size_kb / 1000);
// //         if(size_mb > 1000){
// //           const size_GB = Math.ceil(size_mb / 1000)
// //           result_size = size_GB + "GB"
// //         }else{
// //           result_size = size_mb + "MB"
// //         }
// //       }else{
// //         result_size = size_kb + "KB"
// //       }
// //         result.push({fileName:current_file.originalname,fileSize:result_size,fileDate:date_uploaded,rowNum:`${i+1}`,onChangeHandler:rowCheck})
        
// //       }
// //       var sendData = {files:result,email:email}

// //       navigate({pathname: "/Drive",search: createSearchParams({
// //         files:savedFiles,
// //         email:email
// //       }).toString()})
// //       //setTableData(result)
   
// //     },[])
//     const history = useHistory();
//     useEffect(() =>{

//     }, [history])

//     return (
//         <BrowserRouter>
//         <div>Loading...</div>
//         </BrowserRouter>
//     );
// }