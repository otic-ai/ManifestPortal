import React, { useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { Button, FormLabel, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jsx } from '@emotion/react';
const FormViewDefine = ({ view , id }) => {
    const url = useNavigate();
    const [open, setOpen] = React.useState(view);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(()=>{
        setOpen(view)
    },[view])
    const [selectedFile , setSelectedFile ] = useState(false);
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
  
      // Handle the selected file here...
    };
   
    const handleClickOpenDialog = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setOpen(false);
      window.location.reload();
    };
  return (
    <div> 
          <Dialog
      open={open}
      onClose={handleCloseDialog}
      style={{minWidth:'550px'}}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          setOpen(false);
          url(`/qrcode/${id}`)
         
      
        },
      }}
    >
      <DialogTitle>Add Form / Upload Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
         Fill in the form below to create new form
         <div style={{height:'20px'}}></div>
        </DialogContentText>
        <FormControl    sx={{maxWidth: '600px' , width:'400px'}} variant="standard"> 
        <TextField
      required={true}
      style={{ 
         
       }}
       disableUnderline
      // onChange={(event) => handleChange(event, index)}
     //  value={categories[index].value}
       id='name'
       name='name'
       label="Form Name"
      // defaultValue="Hello World"
  //     helperText="Incorrect entry."
       sx={{maxWidth: '600px' , width:'400px'}}
     />
        </FormControl>
        
  
   <div style={{height:'20px'}}></div>
   <FormControl    sx={{maxWidth: '600px' , width:'400px'}} variant="standard"> 
        <TextField
      required={true}
      inputProps={{ accept: '.xlsx,.xls,.csv' }}
       disableUnderline
       id='file'
       name='file'
       onChange={handleFileChange}
       type='file'
       sx={{maxWidth: '600px' , width:'400px'}}
     />
        </FormControl>
   
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} style={{ color: '#FFA500'}}>Cancel</Button>
        <Button type="submit" style={{ color: '#FFA500' }}>Add</Button>
      </DialogActions>
    </Dialog></div>
  )
}

export default FormViewDefine