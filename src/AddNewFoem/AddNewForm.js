import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormLabel, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jsx } from '@emotion/react';
import { createFormAPI } from '../Http/FormCreate';
const AddNewForm = ({ mode }) => {
    const [open, setOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
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
  };
  return (
    <div> 
        <IconButton onClick={handleClickOpenDialog} aria-label="delete">
  <AddCircleIcon  mode={true}/> Create
</IconButton>  
        <Dialog
    open={open}
    onClose={handleCloseDialog}
    style={{minWidth:'550px'}}
    PaperProps={{
      component: 'form',
      onSubmit: async(event) => {
        event.preventDefault();
        setIsVisible(false)
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
     try{
      await  createFormAPI(formJson) 
      handleCloseDialog();
      window.location.reload();
     }catch(e){
      alert(e)
     }
     setIsVisible(true)
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
    required={false}
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
     {isVisible ?   <Button type="submit"  style={{ color: '#FFA500' }}>Add</Button>: <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>}
    </DialogActions>
  </Dialog></div>
  )
}

export default AddNewForm