import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './test.css';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MyChartComponent from './Homepage/Barchart';
import MyComponent from './Homepage/modetest';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IconButton, Typography } from '@mui/material';
import CustomizeForm from './Homepage/CustomizationDialogBox';
import DateCalendarValue from './Homepage/Date';
import DateCalendarFormProps from './Homepage/Date';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'darks' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const data = [{'d':{'car':2882,'fn':874374,'fghdfn':874374},'di74787845dji':{'car':2882,'fn':874374,'fghdfn':874374},'didyweyyji':{'car':2882,'fn':874374,'fghdfn':874374},'didji':{'car':2882,'fn':874374,'fghdfn':874374},'dididfdhhji':{'car':2882,'fn7':87884,'f':8744},'dididi':{'car':2882,'fn7':874,},'sdjhsdjh':{'car':2882,'fn':874374}}];
  
  
export default function BasicGrid() {
    const [open, setOpen] = React.useState(false);
    const [test, setTest] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
      React.useEffect(() => {
        // Side effect logic goes here
        console.log('Data changed:', data);
      }, [test])
  return (
    <Box className='manifest-info2w'  sx={{ flexGrow: 1 }}>
      <Grid container style={{height:'100%'}} spacing={0.2}>
        <Grid item className='pie'>
          <Item style={{height:'95%',width:''}} >
          <div style={{ marginLeft: '10px',display:'flex',flexDirection:'row' }}> 
           <div style={{width:'3%'}}></div>
            <DateCalendarFormProps/>
            </div>
          </Item>
        </Grid>
        <Grid item  className='data'>
          <Item  style={{height:'95%',width:''}} >
     
          </Item>
        </Grid>
        <Grid item className='graph'>
        <Item  style={{height:'95%',width:''}} >
        <div style={{ marginLeft: '10px',width:'20%',display:'flex',flexDirection:'row' }}> {/* Apply inline style to adjust the margin */}
        <IconButton onClick={handleClickOpen} aria-label="delete" size="large">
  <PlaylistAddIcon fontSize="inherit" />
</IconButton>
    </div>
    <div style={{height:'10px'}}></div>
        <div style={{display:'flex',flexDirection:'row',height:'90%'}}>
                <div className='mixed-bar-position'></div>
               
                <MyChartComponent data={data} />
            {/*    <ManifestActivity data={yourData} /> */}
            </div>
          </Item>
        </Grid>
        
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const datas = formJson.data;
            const times = formJson.time;
            const years = formJson.year;
            const months = formJson.month;
            console.log(data);
            setTest(datas+' '+times+' '+years+' '+months)
            handleClose();
          },
        }}
      >
        <DialogTitle>
          
   <div style={{
     display: 'flex',
     justifyContent: 'center', // Horizontally center the content
     marginTop: '15px',
   }}>
   <Typography sx={{ fontFamily: 'Serif' }} gutterBottom variant="h5" component="h2">
                Customize Graph
            </Typography>
   </div>      
          
            <div style={{
      borderBottom: '1px solid #B2BEB5', // Adjust the color, thickness, and style as needed
      margin: '5px 0', // Optional: Adjust margin for spacing
    }}></div>        
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
      
         <CustomizeForm />
        </DialogContent>
        <DialogActions>
         <div  style={{
     display: 'flex',
     justifyContent: 'center', 
     alignContent:'center',
      marginRight: '35%',
      
   }}>
     <Button sx={{ backgroundColor: '#F28C28', minWidth:'150px' ,
      '&:hover': {
        backgroundColor: '#FFA500', // Change this to the desired hover color
      },}} 
      variant="contained" type="submit">Submit</Button>
   </div> 
   <div style={{height:'70px'}}>
  
    </div>      
        </DialogActions>
      </Dialog>
   
    </Box>
  );
}
