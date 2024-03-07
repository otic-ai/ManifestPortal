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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const FormView = () => {
    let { formid } = useParams();
    const [formdesign, setFormdesign]= useState([{'fieldname':'First Name','required':false,'value':null,
    'id':'fname','dropdown':true,'inputtype':'text','category':['sdhh','sdsdjhsd','sdsdjh']},
    {'fieldname':'lirst Name','required':false,'value':null,
    'id':'lname','dropdown':false,'inputtype':'text','category':['sdhh','sdsdjhsd','sdsdjh']},
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
        
        <div>
        
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
         sx={{maxWidth: '600px' , width:'95vw'}}
       />  :<FormControl sx={{maxWidth: '600px' , width:'95vw'}}>
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
    ))}
         
       
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
    </div>
  )
}

export default FormView