import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './home.css';
import Header from '../Header/header';
import MyChartComponent from './Barchart';
import { Button, IconButton, Typography } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomizeForm from './CustomizationDialogBox';
import Enhancedtable from './Table';
import MyCalendar from './Date2';
import Home from './home';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function HomeGrid() {
    const [open, setOpen] = React.useState(false);
    const [test, setTest] = React.useState(false);
    const [height, setHeight] = React.useState(0);
    const [height2, setHeight2] = React.useState(0);
    const [screenwidth, setScreenwidth] = React.useState(0);

    React.useEffect(() => {
        const handleResize = () => {
          setScreenwidth(window.innerWidth);

        };
    handleFirstComponentRef();
    handleFirstComponentRefSecondGrid();
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
      
const handleFirstComponentRef = (el) => {
  if (el && screenwidth >= 790) {
    const hh = 92/100 * el.offsetHeight
    setHeight(hh);
  } else {
    setHeight(400)
  }
};
const handleFirstComponentRefSecondGrid = (el) => {
    if (el && screenwidth >= 790) {
      const hh = 77/100 * el.offsetHeight
      setHeight2(hh);
    } else {
        setHeight2(350)
    }
  };
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
  
    
      const data = [{'d':{'car':2882,'fn':874374,'fghdfn':874374},'di74787845dji':{'car':2882,'fn':874374,'fghdfn':874374},'didyweyyji':{'car':2882,'fn':874374,'fghdfn':874374},'didji':{'car':2882,'fn':874374,'fghdfn':874374},'dididfdhhji':{'car':2882,'fn7':87884,'f':8744},'dididi':{'car':2882,'fn7':874,},'sdjhsdjh':{'car':2882,'fn':874374}}];
  
  return (
    <div className='home' >
          <Header activeIndex={0} />
          <div className='top-header'>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid ref={handleFirstComponentRef} className='grid1' item >
          <Item>
            <Home />
          </Item>
        </Grid>
        <Grid  className='grid2' item >
          <Item >
         <MyCalendar height={height}/>
          </Item>
        </Grid>
        <Grid ref={handleFirstComponentRefSecondGrid} item className='grid3'>
          <Item>
          <div style={{ marginLeft: '10px',width:'20%',display:'flex',flexDirection:'row' }}> {/* Apply inline style to adjust the margin */}
        <IconButton onClick={handleClickOpen} aria-label="delete" size="large">
  <PlaylistAddIcon fontSize="inherit" />
</IconButton>
    </div>
    <div style={{height:'10px'}}></div>
        <div style={{display:'flex',flexDirection:'row',height:'90%'}}>
                <div className='mixed-bar-position'></div>
               
                <MyChartComponent data={data} charttype={'bar'}/>
            {/*    <ManifestActivity data={yourData} /> */}
            </div>
          </Item>
        </Grid>
        <Grid item className='grid4'>
          <Item>
          <Enhancedtable height={height2} />
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
            const charttype = formJson.charttype
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
    </div>
    </div>
  );
}
