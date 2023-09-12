import React from "react";
import TableRow from '@mui/material/TableRow';
import { Button, Checkbox, TableCell } from "@mui/material";
import { FileIcon, defaultStyles } from 'react-file-icon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile,faFileWord,faFileAudio,faFilePdf,faFileLines,faFileVideo,faFileExcel,faFileCsv,faFileCode,faFolder, faImage } from "@fortawesome/free-solid-svg-icons"
import { useState,useEffect } from "react";
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
export default function DriveRow({onChangeHandler,fileName,fileSize,fileDate,rowNum,email}){


    const [fileData,setFileData] = useState(null)
  
    const [icon,setIcon] = useState(null)
    useEffect(() => {
    
          
        let temp = false;
        let fileType_idx;

        for (let i = 0; i < fileName.length; i++) {
            if (fileName.charAt(i) === '.') {
                temp = true;
                fileType_idx = i + 1;
                break;
            }
        }

        let result = fileName.toString().substring(fileType_idx);
      
        if (result === "gif" || result === "jpg" || result === "jpeg" || result === "svg" || result === "tif" ||result === "tiff" || result === "png") {
          setIcon(faImage)
        }else if(result === "mp3" || result === "wav" || result === "mpa"){
             setIcon(faFileAudio)
        }else if(result === "pdf"){
            setIcon(faFilePdf)
          
        }else if(result === "doc" || result === "docx"){
            setIcon(faFileWord)
         
        }else if (result === "txt"){
            setIcon(faFileLines)
        }else if(result === "mp4" || result === "mpg" || result === "mov"){
            setIcon(faFileVideo)
         
        }else if (result === "xlsx" || result === "xls" || result === "xlsm" ){
            setIcon(faFileExcel)
        }else if (result === "csv"){
            setIcon(faFileCsv)
        }else if(result == "c" || result === "cpp" || result === "h" || result =="java" || result == "py"){
            setIcon(faFileCode)
        }else if(result === ""){
            setIcon(faFolder)
    
        }else{
           setIcon(faFile) 
        }
            
   
        


   
    },[fileName]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    //need to reset the row number (row id) of the other rows when one gets deleted
    const singleDelete = () =>{
      var current_row = document.getElementById(`file_row${rowNum}`)
      current_row.remove();
      var rows = document.getElementById('fileTable').rows
      for(let i = 1; i < rows.length; i++){
        var rowCheckBox = rows[i].children[0].children[0].children[0]
        rowCheckBox.id = `rowCheckBox${i}`
        rowCheckBox.checked = false
      }
      var file_idx = rowNum-1
      var fileData = {email:email,idx:file_idx}
      fetch("http://localhost:8000/DeleteFile/",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(fileData)
      }).then(response =>response.json())
      .then(responseData =>{
        if(responseData.success){
          console.log("File Deleted")
        }else{
          console.log("Error Occurred")
        }
            
      })
      .catch(error => {
        console.error("Error", error)
      })
     }
    
     const rename = ()=>{
        var temp = document.getElementById(`fileName${rowNum}`) 
        var fileName = temp.innerHTML;
        var dot_idx = 0;
        var foundDot = false;
        for (let i = 0; i < fileName.length; i++) {
          if (fileName.charAt(i) === '.') {
            foundDot = true;
              dot_idx = i;
              break;
          }
      }

      let result = fileName.toString().substring(0,dot_idx);
       //let fileType = fileName.toString().substring(dot_idx) 
        var rename_field = document.getElementById(`rename_file${rowNum}`)
        rename_field.type = "text";
        rename_field.value = result;
        rename_field.focus();
        temp.innerHTML = ""
        rename_field.addEventListener("keypress",(event) =>{
          if(event.key === "Enter"){
            var fileType =  fileName.toString().substring(dot_idx);
            temp.innerHTML = rename_field.value + fileType;
            rename_field.type = "hidden"
             var renameData = {newFileName:rename_field.value + fileType,email:email,fileIdx:rowNum-1}
        fetch("http://localhost:8000/RenameFile/",{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(renameData)
        }).then(response =>response.json())
        .then(responseData =>{
          if(responseData.success){
            console.log("File Was renamed")
          }else{
            console.log("Error Occurred")
          }
              
        })
        .catch(error => {
          console.error("Error", error)
        })
          }

        })
       
       }
       const download = () =>{
      
        var downloadData = {idx:rowNum - 1,email:email}
        const queryParams = new URLSearchParams(downloadData).toString()
        fetch(`http://localhost:8000/Download/${queryParams}`,{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
          },
   
        }).then(response =>response.blob())
        .then(responseData =>{
            setFileData(responseData)
            console.log("file data: ");
            console.log(fileData)
              
        })
        .catch(error => {
          console.error("Error", error)
        })
        if(fileData){
          const url = URL.createObjectURL(fileData);
         const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Specify the filename here
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        }else{
          console.log("file does not exist")
        }


          }
        


     


    return (
    <TableRow id = {`file_row${rowNum}`}>
        <TableCell style={{padding:"10px"}}><Checkbox id = {`rowCheckBox${rowNum}`} onChange = {onChangeHandler}  ></Checkbox>   
          <FontAwesomeIcon icon={icon} size="xl" style={{paddingRight:"5px"}} /> 
          <input id = {`rename_file${rowNum}`} width="20px" type = "hidden"/>
            <span id = {`fileName${rowNum}`} > {fileName}</span>
           
          
          
        </TableCell>
   
        <TableCell>{fileSize}</TableCell>
        
        <TableCell>{fileDate}</TableCell>
        <TableCell>
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
       
       
      >
        <MenuItem onClick={singleDelete} > <DeleteIcon/> Delete</MenuItem>
        <MenuItem onClick={rename}> <EditIcon/>Rename</MenuItem>
        <MenuItem onClick = {download} ><DownloadIcon/>Download</MenuItem>
      </Menu>
       
        </TableCell>
        </TableRow>
        )
}