import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom';
import Header from '../Header/header';
import './formview.css'
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
import { Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jsx } from '@emotion/react';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const FormView = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

    let { formid } = useParams();
    const [formdesign, setFormdesign]= useState([{'fieldname':'Name','required':true,'value':null,
    'id':'fname','dropdown':true,'inputtype':'text','category':['sdhh','sdsdjhsd','sdsdjh']},
    {'fieldname':'lirst Name','required':false,'value':null,
    'id':'lname','dropdown':false,'inputtype':'url','category':['sdhh','sdsdjhsd','sdsdjh']},
    ])
    const [categories, setCategories] = React.useState(formdesign);

  const handleChange = async (event,index) => {
    const updatedCategories = [...categories]; // Create a copy to avoid mutation
    updatedCategories[index].value = event.target.value;
    setCategories(updatedCategories);
   
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get the values from the categories state
    const formValues = categories.map((item) => ({
        value: item.value,
        id: item.id, // Add form ID to the object
      }));
  
    // Do something with the formValues, e.g., send them to a server
    alert(JSON.stringify(formValues)); // For demonstration, log the values to the console
  };
  const handleDeleteField = (index) => {
    return () => {
      const shouldDelete = window.confirm('Are you sure you want to delete this field?');
      // Create a copy of the current formdesign array
      if (shouldDelete) {
      const updatedFormDesign = [...formdesign];
      // Remove the item at the specified index
      updatedFormDesign.splice(index, 1);
      // Update the state with the modified array
      setFormdesign(updatedFormDesign);}
    };
  };
  
  
  return (
    <div >
         <Header activeIndex={1} />
         <div className='top-header'>
         <Box sx={{ flexGrow: 1 }}>
         <Grid container spacing={2}>
  <Grid item xs={8}>
  <item><form  onSubmit={handleSubmit} className='form'> 
  <div style={{display:'flex', flexDirection:'row'}}><h2 style={{fontSize:'29px'}}><CreateIcon /> STUDENT <span style={{fontSize:'20px',fontWeight:'400'}}>
    Mak Fellowship - 192</span></h2></div>
  <FormControl  fullWidth sx={{ m:1,  }} variant="standard">
    
    {formdesign.map((value,index) =>(
        
      <div style={{display:'flex', flexDirection:'row'}}>
      <IconButton  onClick={handleDeleteField(index)} aria-label="delete">
  <DeleteIcon />
</IconButton>
        <div style={{width:'10px', color:'white'}}>cx</div> <div>
        
          {value.dropdown == false?<TextField
        required={value.required}
        style={{ 
           
         }}
         disableUnderline
         onChange={(event) => handleChange(event, index)}
         value={categories[index].value}
         id={value.id}
         label={value.fieldname}
        // defaultValue="Hello World"
    //     helperText="Incorrect entry."
         sx={{maxWidth: '600px' , width:'80vw'}}
       />  :<FormControl sx={{maxWidth: '600px' , width:'80vw'}}>
       <InputLabel  required={value.required}  id={value.id}>{value.fieldname}</InputLabel>
       <Select
         labelId={value.id}
         id={value.id}
         value={categories[index].value}
         label={value.fieldname}
         onChange={(event) => handleChange(event, index)}
         required={value.required} 
       >
         <MenuItem value="">
           <em>None</em>
         </MenuItem>
         {value.category.map((item)=>(
            <MenuItem value={item}>{item}</MenuItem>
            
           ))}
       </Select>
       
     </FormControl>}  
        
       <div style={{color:'white', height:"20px"}}></div>
       </div>
       </div>
    ))}
         
         <IconButton onClick={handleClickOpenDialog} aria-label="delete">
  <AddCircleIcon /> Add New Field
</IconButton>  
    </FormControl>
    <Button sx={{ marginLeft:'50%',backgroundColor: '#F28C28', minWidth:'150px' ,
      '&:hover': {
        backgroundColor: '#FFA500', // Change this to the desired hover color
      },}} 
      variant="contained" type="submit">Submit</Button>
    </form>  </item>
  </Grid>
  </Grid>
  </Box>
         </div>
         <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
           // const email = formJson.email;
            alert(JSON.stringify(formData))
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>Add Field</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Fill in the form below to add new field
           <div style={{height:'20px'}}></div>
          </DialogContentText>
          <FormControl  fullWidth  sx={{maxWidth: '600px' , width:'80vw'}} variant="standard"> 
          <TextField
        required={true}
        style={{ 
           
         }}
         disableUnderline
        // onChange={(event) => handleChange(event, index)}
       //  value={categories[index].value}
         id='name'
         label="Field Name"
        // defaultValue="Hello World"
    //     helperText="Incorrect entry."
         sx={{maxWidth: '600px' , width:'80vw'}}
       />
          </FormControl>
          <div style={{height:'20px'}}></div>
          <FormControl sx={{maxWidth: '600px' , width:'80vw'}}>
       <InputLabel  required={true}  id='type'>Field Type</InputLabel>
       <Select
         labelId='type'
         id='type'
        // value={categories[index].value}
         label='Field Type'
      //   onChange={(event) => handleChange(event, index)}
         required={true} 
       >
         <MenuItem value="">
           <em>None</em>
         </MenuItem>
         <MenuItem value='text'>Text</MenuItem>
         <MenuItem value='number'>Number</MenuItem>
         <MenuItem value='email'>Email</MenuItem>
         <MenuItem value='category'>Category</MenuItem>
       
       </Select>
       
     </FormControl>
     <div style={{height:'20px'}}></div>
          <FormControl sx={{maxWidth: '600px' , width:'80vw'}}>
       <InputLabel  required={true}  id='type'>Is this field rquired?</InputLabel>
       <Select
         labelId='required'
         id='required'
        // value={categories[index].value}
         label='Field Type'
      //   onChange={(event) => handleChange(event, index)}
         required={true} 
       >
         <MenuItem value="">
           <em>None</em>
         </MenuItem>
         <MenuItem value='true'>Yes</MenuItem>
         <MenuItem value='false'>No</MenuItem>
       </Select>
       
     </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: '#FFA500'}}>Cancel</Button>
          <Button type="submit" style={{ color: '#FFA500' }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormView