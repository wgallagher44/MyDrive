import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Button, Checkbox, TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DriveRow from "./DriveRow.jsx"
import { useState,useEffect } from 'react';

import "./Drive.css"

export default  function Drive(props) {
  let navigate = useNavigate();
  
  const [isDisabled,setDisabled] = useState(true)
 

  const rowCheck = () =>{
    var rows = document.getElementById("fileTable").rows

   for(let i = 1; i < rows.length; i++){
     var curr_checkBox = document.getElementById(`rowCheckBox${i}`)
   
     if(curr_checkBox.checked){
      setDisabled(false)
      return;
     }
     }
  setDisabled(true)


} 
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

  const [tableData,setTableData] = useState([])
  useEffect(()=>{
 
  var fetchedFiles = props.files

    console.log(fetchedFiles)
      var result = [];
    for(let i = 0; i < fetchedFiles.length; i++){
      var current_file = fetchedFiles[i].file;
      console.log(fetchedFiles[i])
      var date_uploaded = fetchedFiles[i].date;
      var result_size = ""
    var size = current_file.size;
    const size_kb = Math.ceil( size / 1000)
    if(size_kb > 1000){
      const size_mb = Math.ceil(size_kb / 1000);
      if(size_mb > 1000){
        const size_GB = Math.ceil(size_mb / 1000)
        result_size = size_GB + "GB"
      }else{
        result_size = size_mb + "MB"
      }
    }else{
      result_size = size_kb + "KB"
    }
      result.push({fileName:current_file.originalname,fileSize:result_size,fileDate:date_uploaded,rowNum:`${i+1}`,onChangeHandler:rowCheck,email:email})
      
    }

    setTableData(result)
  

  },[])
  

  
  
  



  const deleteMultipleFile = () =>{
    const rows = document.getElementById("fileTable").rows;
    var deleted_idx = []
    for(let i = 1; i < rows.length; i++){
  
      var current_row = document.getElementById(`file_row${i}`);
      
      var current_row_checkbox = document.getElementById(`rowCheckBox${i}`)
      if(current_row_checkbox.checked){
        deleted_idx.push(i - 1);
        current_row.remove();
      }
    }
    /**
     * Reset checkbox id to have it from 1- to the number of rows 
     */
    for(let i = 1; i < rows.length; i++){
      var rowCheckBox = rows[i].children[0].children[0].children[0]
      rowCheckBox.id = `rowCheckBox${i}`
      rowCheckBox.checked = false
    }
    console.log(email);
    console.log(deleted_idx)
    var data = {email:email,deleted_idx:deleted_idx};
    console.log(data)
    fetch("http://localhost:8000/DeleteMultiple/",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })


  }
  const logout = () =>{
    navigate("/")
  }


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsHighlighted(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHighlighted(true);
   
  };

  const handleDragLeave = () => {
    setIsHighlighted(false);
  };

  const multipleDownload =  async () =>{
    const rows = document.getElementById("fileTable").rows;
    var download_idx = [];
    for(let i = 1; i <rows.length; i++){
      //var curr = document.getElementById(`file_row${i}`);
      var current_row_checkbox = document.getElementById(`rowCheckBox${i}`)
      // console.log(current_row_checkbox.checked)
      if(current_row_checkbox.checked){
        download_idx.push(i - 1);
       
      }
    }
   
     var sendData = {idxs:download_idx,email:email};
     const queryParams = new URLSearchParams(sendData).toString();
     fetch(`http://localhost:8000/MultipleDownload/${queryParams}`,{
       method:'GET',
     headers: {
         'Content-Type': 'application/json',
       },
     }).then(response => response.json())
     .then(async responseData => {
       var urls = responseData.filePaths;
       console.log(urls)
       for(let i =0; i< urls.length; i++){
        const fileUrl = new URL(`file://${encodeURIComponent(urls[i])}`);
        const urlString = fileUrl.toString();
        console.log(urlString)
       }
     })
  }

  



  const handleDrop = (e) => {
    e.preventDefault();
    setIsHighlighted(false);

    
    
    const files = e.dataTransfer.files[0];
    var result_size = ""
    var size = files.size;
    const size_kb = Math.ceil( size / 1000)
    if(size_kb > 1000){
      const size_mb = Math.ceil(size_kb / 1000);
      if(size_mb > 1000){
        const size_GB = Math.ceil(size_mb / 1000)
        result_size = size_GB + "GB"
      }else{
        result_size = size_mb + "MB"
      }
    }else{
      result_size = size_kb + "KB"
    }
    var currentdate = new Date();
    var datetime = currentdate.getMonth()+1  + "/"
                +  currentdate.getDate() + "/" 
                + currentdate.getFullYear() + " "  
                + (currentdate.getHours() > 12 ?currentdate.getHours()-  12   + ":": currentdate.getHours() + ":")  
                + (currentdate.getMinutes() > 10 ? currentdate.getMinutes() : "0" + currentdate.getMinutes())
                + (currentdate.getHours() >= 13 ? "pm" : "am")
             ;
    
    var file_name = files.name;
    var table = document.getElementById("fileTable");
 
   
   
    const newRow = {fileName:file_name,fileSize:result_size,fileDate:datetime,rowNum:table.rows.length,onChangeHandler:rowCheck,email:email}
    setTableData([...tableData,newRow])
    const formData = new FormData();
    formData.append("email",email);
    formData.append("date",datetime)
    formData.append('files',e.dataTransfer.files[0]);

    console.log(...formData)
    fetch('http://localhost:8000/uploadFile/',{
        method:'POST',
       
        body: formData,

      })
      .then(response =>response.json())
      .then(responseData =>{
          console.log(responseData
            )
      })
      .catch(error => {
        console.error("Error", error)
      })
  }
   

  const dropZoneStyle = {
    padding: '20px',
    
    backgroundColor: isHighlighted ? 'lightblue' : 'white',
  };
 

  return (
        <div>
 <AppBar position="static">
        <Toolbar id = "toolbar">
            <div>
                <TextField id = "search" label = "Search" variant="filled" color="success"  ></TextField>  
            </div>
              <IconButton disabled = {isDisabled} id = "download" onClick={multipleDownload}> Download
                  <DownloadIcon/>
                 </IconButton> 
                 <IconButton id = "delete" disabled = {isDisabled} onClick={deleteMultipleFile} > Delete
                  <DeleteIcon/>
                 </IconButton> 
              <IconButton
               id = "logout"
               onClick={logout}
              >
              Logout
               <LogoutIcon/> 
               
              </IconButton>
              <Button>Logout</Button>
             
          
        </Toolbar>
      </AppBar>
       
<TableContainer    component={Paper} 
           style={dropZoneStyle}
           onDragEnter={handleDragEnter}
           onDragOver={handleDragOver}
           onDragLeave={handleDragLeave}
           onDrop={handleDrop}>
            
            <Table sx={{ minWidth: 650 }}  aria-label="simple table" id = "fileTable">
                <TableHead>
                  <TableRow>
                   <TableCell > File Name</TableCell>
                  <TableCell >File Size</TableCell>
                  <TableCell >Date Uploaded</TableCell>
                  <TableCell>Options</TableCell> 
                  </TableRow>
                  
                </TableHead>
                <TableBody>
                  {tableData.map((row,index) => (
                      
                      <DriveRow key = {index} {...row}/>
                  ))}
               
                </TableBody>
          </Table>
          </TableContainer>
       
          
        </div>
     
   
  );
}