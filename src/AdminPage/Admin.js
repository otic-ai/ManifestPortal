import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { FormDataViewAPI } from '../Http/ViewFormData';
import Header from '../Header/header';
import FormHomePage from '../FormPage/form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { registerManifest } from '../Http/RegisterManifest';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { listManifest } from '../Http/ListManifest';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const Admin = () => {
    const url = useNavigate();
  const [display, setDisplay] = React.useState(false);
  const [ data, setData ] = React.useState([
    { id: 1, Name: 'Makerere', Region: 'central', Contact: 'dsds', Leader: 'Makerere' },
  ]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'Name', headerName: 'Name',   flex: 0.1 },
    { field: 'Region', headerName: 'Region',   flex: 0.1 },
    { field: 'Contact', headerName: 'Contact',   flex: 0.1 },
    { 
      field: 'Leader', 
      headerName: 'Leader', 
      flex: 0.1
     
    },
    { 
        field: 'view', 
        headerName: '', 
        flex: 0.1,
        renderCell: (params) => (
            <IconButton onClick={async()=>{
              //  alert(JSON.stringify(params.value))
              url(`/profile/${params.value}`)
            }} aria-label="delete">
            <ReadMoreIcon />
          </IconButton>
        )
      }
  ];
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };


  
  const fetchData = async () => {
    try {
   const response = await listManifest()
  setData(response.data)
    } catch (error) {
      console.error('Error fetching form data:', error);
     // alert(error)
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
    <div >
   
      {display ? (<div><Header activeIndex={1}  />
      <div style={{marginTop:'90px',marginLeft:'60vw'}} >
        <Button style={{color:'orange'}} variant="outlined" onClick={handleClickOpen}>
        Register Manifest
      </Button>
     
    </div>
    <div style={{ height: 300, width: '100%' }}>
      
    <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false  // Hide ID column initially
            }
          }
        }}
      />
    </div>
      <Dialog
        open={open}
        onClose={handleClose}
       
        PaperProps={{
          component: 'form',
          onSubmit: async(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.name;
            console.log(email);
            await registerManifest(JSON.stringify(formJson))
            handleClose();
          },
        }}
      >
        <DialogTitle  style={{minWidth:'350px'}}>Enroll</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined" 
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="location"
            name="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined" 
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="contact"
            name="contact"
            label="Contact"
            type="tel"
            fullWidth
            variant="outlined" 
          />
        </DialogContent>
        <DialogActions>
          <Button style={{color:'orange'}} onClick={handleClose}>Cancel</Button>
          <Button type="submit" style={{color:'orange'}}>Register</Button>
        </DialogActions>
      </Dialog>
      
      </div>):(<div />)}
     
    </div>
  );
};

export default Admin;
