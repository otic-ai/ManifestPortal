import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FormControl } from '@mui/base';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormManagement({ view }) {
  const [open, setOpen] = React.useState(view);
  const [openformadd, setOpenformadd] = React.useState(false);
  const [selectedFile , setSelectedFile ] = React.useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    // Handle the selected file here...
  };
  const [instance, setInstance] = React.useState([
    {
      name: 'men gather',
      default: true,
      endDate: ''
    },
    {
      name: 'men gather1',
      default: false,
      endDate: ''
    }
  ]);

  const handleClose = () => {
    setOpen(false);
    window.location.reload(); // Consider an alternative way to handle closing the dialog
  };
  const handleCloseformAdd = () => {
    setOpenformadd(false)
// Consider an alternative way to handle closing the dialog
  };
  React.useEffect(() => {
    setOpen(view);
  }, [view]);

  const handleSwitchChange = (index) => (event) => {
    const updatedInstances = [...instance];
    updatedInstances[index].default = event.target.checked;
    setInstance(updatedInstances);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const keys = Object.keys(formJson);
            alert(JSON.stringify(formJson));
            handleClose();
          }
        }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'orange' }} variant="h6" component="div">
              Form Management
            </Typography>
            <Button autoFocus style={{ color: 'orange' }} color="inherit" type="submit">
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ height: '10px' }}></div>
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
 <div style={{ left: '0px', fontSize: '23px', fontWeight: 'bold' }}>Targets</div>
          <div style={{ height: '10px' }}></div>
          <div style={{ left: '0px', fontSize: '23px', fontWeight: 'bold' }}>Data Upload</div>
          <div style={{ height: '10px' }}></div>
          <FormControl variant="standard"> 
      <TextField
    required={true}
    inputProps={{ accept: '.xlsx,.xls,.csv' }}
     disableUnderline
     id='file'
     name='file'
     onChange={handleFileChange}
     type='file'
   //  sx={{maxWidth: '600px' , width:'400px'}}
   />
      </FormControl>
          <div style={{ left: '0px', fontSize: '23px', fontWeight: 'bold' }}>Instances</div>
          <div style={{ height: '10px' }}></div>
          <IconButton style={{marginLeft:'-200px'}} onClick={()=>{
          // setOpen(false)
           setOpenformadd(true)
          }} >
            <AddTaskIcon /> <div style={{color:'transparent'}}>h</div>  <span>Add</span>
          </IconButton>
          <div style={{ height: '10px' }}></div>
          {instance.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={item.default}
                    onChange={handleSwitchChange(index)}
                    name={`${item.name}`}
                  />
                }
                label={item.name}
              />
              {item.default && ( // Conditionally render DateTimePicker if item.default is true
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker name={`date-${index}`} label="Close Date" />
                </LocalizationProvider>
              )}
              <IconButton
                onClick={() => {
                    const shouldDelete = window.confirm('Are you sure you want to delete this field?');
  
                    if (shouldDelete ) {
                      const updatedFormDesign = [...instance];
                      updatedFormDesign.splice(index, 1);
                      setInstance(updatedFormDesign);
                    
                    }
                }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

        </div>
      </Dialog>
      <Dialog   
      open={openformadd}
      onClose={handleCloseformAdd}
      TransitionComponent={Transition}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const keys = Object.keys(formJson);
          const isFieldNameUnique = instance.every((field) => field.name !== formJson['name']);
          if (!isFieldNameUnique ){
            alert('Field name already exists. Please choose a different name.')
            return;
          }
          const newDesign = {'name':formJson.name, default: true,
          endDate: ''}
          instance.push(newDesign)
          setInstance(prevItems => [...prevItems].reverse());
         setOpenformadd(false)
        }
      }}
      >
        <DialogTitle>Add New Form Instance</DialogTitle>
        <DialogContent>
            <div style={{height:'10px'}}></div>
    <FormControl>
        <TextField 
        style={{width:'350px'}}
         name="name"
         label="Instance Name"
         required
        />
    </FormControl>
        
        </DialogContent>
        <DialogActions>
        <Button type="submit" style={{ color: '#FFA500' }}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
