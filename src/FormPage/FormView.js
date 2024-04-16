import React, { useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom';
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
import MultiTextFields from './MultiForm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';

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


const FormView = () => {
  const [display, setDisplay] = React.useState(false);
  const url = useNavigate();   
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      setDisplay(true)
    } else {
    
    
      url('/login')
    }
  });
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
      id: 'fname',
      dropdown: true,
      inputtype: 'text',
      category: ['sdhh', 'benon','jjdsjksdjk','hsdjhsdjh'],
    },
  ]);

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


 

 

  
  return (
    <div  style={{
      display:display ? 'block':'none'
    }}>
         <Header activeIndex={1} />
         <div className='top-header'>
         <Dialog   
      open={formNameChange}
      onClose={()=>{
        setFormNameChange(false)
      }}
      TransitionComponent={Transition}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const keys = Object.keys(formJson);
          setFormName(formJson['formname'])
          setFormNameChange(false)
        }
      }}
      >
        <DialogTitle>Change Name</DialogTitle>
        <DialogContent>
            <div style={{height:'10px'}}></div>
    <FormControl>
        <TextField 
        style={{width:'350px'}}
         name="formname"
         label="Form Name"
         required
        />
    </FormControl>
        
        </DialogContent>
        <DialogActions>
        <Button type="submit" style={{ color: '#FFA500' }}>Add</Button>
        </DialogActions>
      </Dialog>
         <Box sx={{ flexGrow: 1 }}>
         <Grid container spacing={2}>
  <Grid item xs={8}>
  <item><form  onSubmit={handleSubmit} className='form'> 
  <div style={{display:'flex', flexDirection:'row'}}><h2 style={{fontSize:'29px'}}><IconButton onClick={(event)=>{
    setFormNameChange(true)
  }}><CreateIcon  /></IconButton> {formName} <span style={{fontSize:'20px',fontWeight:'400'}}>
    Mak Fellowship - 192</span></h2></div>
  <FormControl  fullWidth sx={{ m:1,  }} variant="standard">
    
    {formdesign.map((value,index) =>(
        
      <div style={{display:'flex', flexDirection:'row'}}>
      <IconButton  onClick={() => {
  setSelectedFormField(index);
    setOpen(true);
  }} aria-label="delete">
  <EditIcon />
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
         
         <IconButton onClick={handleNewField} aria-label="delete">
  <AddCircleIcon /> Add 
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
        style={{minWidth:'550px'}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const keys = Object.keys(formJson);
           
            const isFieldNameUnique = formdesign.every((field) => field.fieldname !== formJson['name']);
          if (!isFieldNameUnique && selectedFormField==null){
            alert('Field name already exists. Please choose a different name.')
            return;
          }
    const newDesign = {'fieldname':formJson['name'],'id':formJson['name'],
    'required':formJson['required'] =='true'? true : false,'value':null,'inputtype':formJson['type'],
    'dropdown':formJson['type']=='category' ? true : false,'unique':formJson['unique']}
    const categoryList = []
    keys.forEach((item) => {
      if (item.startsWith('Category-option')) {
        // Push the new item to categoryList
        categoryList.push(formJson[item]);
      }
    });
    
            const finalDesign = {...newDesign,'category':categoryList}  
            if (selectedFormField==null){
              formdesign.push(finalDesign)
            }else{
              formdesign[selectedFormField] = finalDesign
            }  
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
         label="Field Name"
         defaultValue={selectedFormField !=null? `${formdesign[selectedFormField].fieldname }`:''}
        // defaultValue="Hello World"
    //     helperText="Incorrect entry."
         sx={{maxWidth: '600px' , width:'400px'}}
       />
          </FormControl>
          <div style={{height:'20px'}}></div>
          <FormControl sx={{maxWidth: '600px' , width:'400px'}}>
       <InputLabel name='type'  required={true}  id='type'>Field Type</InputLabel>
       <Select
         labelId='type'
         id='type'
         name='type'
         defaultValue={selectedFormField !=null? `${formdesign[selectedFormField].inputtype }`:''}
         label='Field Type'
         onChange={(event) => {
          if (event.target.value=='category'){
              setIsVisible(true) 
          } else {
            setIsVisible(false)
          }
         }}
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
     {isVisible ?  <FormControl  sx={{maxWidth: '600px'}}>
        <FormLabel>Category Options *</FormLabel>
        <MultiTextFields  options={selectedFormField !=null?formdesign[selectedFormField].category:[]}/>
      </FormControl> : ''}
    
     <div style={{height:'20px'}}></div>
          <FormControl sx={{maxWidth: '600px' , width:'400px'}}>
       <InputLabel  required={true}  id='type'>Is this field rquired?</InputLabel>
       <Select
         labelId='required'
         id='required'
         name='required'
         defaultValue={selectedFormField !=null? `${formdesign[selectedFormField].required }`:''}
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
     <div style={{height:'20px'}}></div>
          <FormControl sx={{maxWidth: '600px' , width:'400px'}}>
       <InputLabel  required={true}  id='type'>Should the field be unique?</InputLabel>
       <Select
         labelId='unique'
         id='unique'
         name='unique'
         defaultValue={selectedFormField !=null? `${formdesign[selectedFormField].unique }`:null}
        // value={categories[index].value}
       
      //   onChange={(event) => handleChange(event, index)}
         required={true} 
       >
         <MenuItem value="">
           <em>None</em>
         </MenuItem>
         <MenuItem value='true'>No</MenuItem>
         <MenuItem value='false'>Unique for Form Instance</MenuItem>
         <MenuItem value='false'>Unique for whole Form</MenuItem>
       </Select>
       
     </FormControl>
        </DialogContent>
        <DialogActions>
          {selectedFormField !=null ?  <Button onClick={handleDeleteField} style={{ color: '#FFA500'}}>Delete</Button>:null}  
          <Button type="submit" style={{ color: '#FFA500' }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormView