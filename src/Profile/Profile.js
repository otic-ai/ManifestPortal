import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { FormDataViewAPI } from '../Http/ViewFormData';
import Header from '../Header/header';
import FormHomePage from '../FormPage/form';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { registerManifest } from '../Http/RegisterManifest';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { getManifestAPI } from '../Http/ChangeManifest';
import { getManifestINfoAPI } from '../Http/getManifestInfo';
import { transferManifest } from '../Http/TransferManifest';
const Profile = () => {
  const { id } = useParams();
  const [display, setDisplay] = React.useState(false);
  const [data, setData] = React.useState([
    { 'id':'4' },
   
  ]);
  const [open, setOpen] = React.useState(false);
  const handleSelect = async(event, value) => {
    if (value) {
     
   await   transferManifest(value)
     window.location.reload();

    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  //  window.location.reload();
  };
  const [top100Films, setTop100Films] = React.useState([{'name':'dsj'}]);
  const [defaultProps, setDefaultProps] = React.useState({
    options: top100Films,
    getOptionLabel: (option) => option.name,
  });
  const url = useNavigate();
  
  const fetchData = async () => {
    try {
     const response = await getManifestINfoAPI({'id':id})

 await  setData(response.data[0])
 
 setTop100Films(response.users)
  setDefaultProps({
    options: response.users,
    getOptionLabel: (option) => option.name,
  }) 
  
    } catch (error) {
      console.error('Error fetching form data:', error);
     
    }
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        // User is signed in
     await   fetchData()
        setDisplay(true);
      } else {
        // User is not signed in, redirect to login
        url('/login');
      }
    });

    return () => {
      // Clean up the auth state listener
      unsubscribe();
    };
  }, []);

 

  return (
    <div style={{ display: display ? 'block' : 'none' }}>
      
      <div >
        {display ? ( <div>
            <Header activeIndex={-1}  />
         <div style={{ marginTop: '70px',
  display: 'flex', 
  justifyContent: 'center', // Centers horizontally
  alignItems: 'flex-start'}}>
         <Card
      variant="outlined"
      sx={{
        miWidth: 20,
        // to make the card resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar src="/static/images/avatar/1.jpg" size="lg" />
        <AvatarGroup size="sm" sx={{ '--Avatar-size': '28px' }}>
          <Avatar src="/static/images/avatar/2.jpg" />
        
        </AvatarGroup>
      </Box>
      <CardContent>
        <Typography level="title-lg"> Information</Typography>
        <Typography level="body-sm" style={{width:'100vw',maxWidth:'600px'}}>
         {data.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', }}> {/* Flexbox to align items on the same line */}
      {/* Attribute Name with different styling */}
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
        Leader:
      </Typography>
      
      {/* User Name with distinct styling */}
      <Typography variant="body1" component="span" sx={{ color: 'gray' }}>
      {data.leader}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Flexbox to align items on the same line */}
      {/* Attribute Name with different styling */}
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
        Contact:
      </Typography>
      
      {/* User Name with distinct styling */}
      <Typography variant="body1" component="span" sx={{ color: 'gray' }}>
      {data.contact}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Flexbox to align items on the same line */}
      {/* Attribute Name with different styling */}
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
        Email:
      </Typography>
      
      {/* User Name with distinct styling */}
      <Typography variant="body1" component="span" sx={{ color: 'gray' }}>
      {data.email}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Flexbox to align items on the same line */}
      {/* Attribute Name with different styling */}
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
        Manifest:
      </Typography>
      
      {/* User Name with distinct styling */}
      <Typography variant="body1" component="span" sx={{ color: 'gray' }}>
      {data.name}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Flexbox to align items on the same line */}
      {/* Attribute Name with different styling */}
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
        Region:
      </Typography>
      
      {/* User Name with distinct styling */}
      <Typography variant="body1" component="span" sx={{ color: 'gray' }}>
      {data.region}
      </Typography>
    </Box>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
          <FavoriteBorder />
        </IconButton>
       
        <Button onClick={handleClickOpen} variant="solid" style={{ color: 'black', backgroundColor: 'orange' }}>
  Transfer
</Button>

      </CardActions>
    </Card></div> 
    <Dialog
        open={open}
        onClose={handleClose}
       
        PaperProps={{
          component: 'form',
          onSubmit: async(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
             alert(JSON.stringify(formJson))
           // await registerManifest(JSON.stringify(formJson))
            handleClose();
          },
        }}
      >
        <DialogTitle  style={{minWidth:'350px'}}>Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <Autocomplete
         onChange={handleSelect}     
  style={{ color: 'white', width: '50vw', minWidth: '200px', maxWidth: '300px' }}
  {...defaultProps}
  id="blur-on-select"
  blurOnSelect
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search Users"
      variant="standard"
      InputProps={{
        ...params.InputProps,
        style: { color: 'black' }, // Set input text color to white
      }}
      InputLabelProps={{
        style: { color: 'black' }, // Set label color to white
      }}
    />
  )}
/>

           
          
        </DialogContent>
        <DialogActions>
        
        
        </DialogActions>
      </Dialog>  
        </div>  ):(<div />)}
     
      </div>
    </div>
  );
};

export default Profile;
