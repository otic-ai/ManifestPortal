import React, { useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/header';
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
import { Button, FormLabel, IconButton, Slide, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jsx } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { FormDesignAPI, SubmitFormDesignAPI } from '../Http/FormDesignAPI';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const FormFill = () => {
  const params = useParams();
  const { formid } = params; 
  const [display, setDisplay] = React.useState(false);
  const url = useNavigate();  
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState('Student');
  const [formNameChange, setFormNameChange] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFormField, setSelectedFormField] = useState(null);
  const [formdesign, setFormdesign] = useState([
    {
      fieldname: 'Name',
      required: true,
      value: null,
      id: 'Name',
      dropdown: false,
      inputtype: 'text',
      category: ['sdhh', 'benon', 'jjdsjksdjk', 'hsdjhsdjh'],
    },
    {
      fieldname: 'Contact',
      required: true,
      value: null,
      id: 'Contact',
      dropdown: false,
      inputtype: 'text',
      category: ['sdhh', 'benon', 'jjdsjksdjk', 'hsdjhsdjh'],
    },
  ]);
  const fetchData = async () => {
    try {
      const responseD = await FormDesignAPI(formid);
      const responseData = responseD['data'];
      const formName1 = responseD['name']
    
   if (responseData.length ===0){}else{
   setFormdesign(responseData)
   setCategories(responseData)
   setFormName(formName1)
   }
  
    } catch (error) {
      console.error('Error fetching form data:', error);
      
    }
  }; 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        setDisplay(true);
        fetchData()
      } else {
        setUserLoggedIn(false);
        setDisplay(false)
        url('/login');
      }
    });

    return () => unsubscribe();
  }, []);
  const [categories, setCategories] = useState(formdesign);

 
  const handleNewField = () => {
  setSelectedFormField(null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleChange = (event, index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].value = event.target.value;
    setCategories(updatedCategories);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formValues = categories.map((item) => ({
      value: item.value,
      id: item.id,
    }));
    alert(JSON.stringify(formValues));
  };


const handleDeleteField = () => {
  const shouldDelete = window.confirm('Are you sure you want to delete this field?');
  
  if (shouldDelete && selectedFormField !== null && selectedFormField >= 0) {
    const updatedFormDesign = [...formdesign];
    updatedFormDesign.splice(selectedFormField, 1);
    setFormdesign(updatedFormDesign);
    setOpen(false);
    setSelectedFormField(null); // Reset selectedFormField after deletion
  }
};


 

 

if (display){
  return (
     <div >
    <Header activeIndex={1} />
    <div className='top-header'>
    
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
<Grid item xs={8}>
<item><form  onSubmit={handleSubmit} className='form'> 
<div style={{display:'flex', flexDirection:'row'}}><h2 style={{fontSize:'29px'}}> {formName} </h2></div>

<FormControl  fullWidth sx={{ m:1,  }} variant="standard">

{formdesign.map((value,index) =>(
   
 <div style={{display:'flex', flexDirection:'row'}}>
 
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
   <Button sx={{ marginLeft:'50%',backgroundColor: '#F28C28', width:'100px' ,
 '&:hover': {
   backgroundColor: '#FFA500', // Change this to the desired hover color
 },}} 
 type='submit'
 variant="contained" >Submit</Button> 
    
</FormControl>

</form>  </item>
</Grid>
</Grid>
</Box>
    </div>
   
</div>
   
  )
}
}

export default FormFill