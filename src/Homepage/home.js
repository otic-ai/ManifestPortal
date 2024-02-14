import React from 'react'
import Header from '../Header/header'
import Sidebartask from '../Sidebar/sidebar'
import './home.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PercentageIndicator from '../TargetProgress/progress';
import Manifestactivity from '../ManifestActivity/manifestactivity';
import ManifestActivity from '../ManifestActivity/manifestactivity';
import BasicGrid from '../test';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Home = () => {
  const theme = useTheme();
  const items = [
    { attribute: 'Team Leader', value: 'Mugumbya Benon' },
    { attribute: 'Start Date', value: '2024-02-01' },
    { attribute: 'Contact', value: '+256703882021' },
    { attribute: 'Email', value: 'legacyallan0@gmail.com' },
    { attribute: 'Region', value: 'Central' },
    // ... more items
  ];
 
  const targets = [
    { name: 'Souls Won',target: '939', current: '200' },
    { name: 'Livestream Attendance',target: '200', current: '104' },
    { name: 'Transportation Attendance',target: '200', current: '14' },
    { name: 'Fellowship Attendance',target: '700', current: '204' },
  
    // ... more items
  ];

  return (
    <Card >
    <CardActionArea >
    
    <Typography>
      <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{width:'40%', color:'white'}}>ghghgh</div>
      <Avatar sx={{ width: 66, height: 66 }} alt="Profile" src="download.png" />
      </div>
     
      </Typography>
      <CardContent >
        <Typography sx={{ fontFamily: 'Serif' }} gutterBottom variant="h4" component="div">
          Manifest Kyenjojo
        </Typography>
    <div>
 {items.map((item) => (
   <div style={{ display: 'flex', flexDirection: 'row' }}>
 
    <Typography sx={{width:'100px', textAlign:'right'}} variant="body2" color="text.secondary">
      {item.attribute}:
    </Typography>
    <div style={{ width: '10px' }}></div>
    <Typography variant="body2" color="text.secondary">
      {item.value}
    </Typography>
  </div>

))}      
      </div> 
      {targets.map((item) => (
   <div >
 <Typography sx={{ fontFamily: 'Serif' }} gutterBottom variant="h6" component="div">
        {item.name} 
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
 
    <Typography sx={{width:'100px', textAlign:'right'}} variant="body2" color="text.secondary">
      Target:
    </Typography>
    <div style={{ width: '10px' }}></div>
    <Typography variant="body2" color="text.secondary">
      {item.target}
    </Typography>
    
  </div>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
 
 <Typography sx={{width:'100px', textAlign:'right'}} variant="body2" color="text.secondary">
   Current:
 </Typography>
 <div style={{ width: '10px' }}></div>
 <Typography variant="body2" color="text.secondary">
   {item.current}
 </Typography>
 
</div>
<div style={{height:'10px'}} ></div>
      <PercentageIndicator target={item.target} current={item.current}/> 
    
  </div>

))}
         
      </CardContent>
    </CardActionArea>
    
  </Card>
   
  )
}

export default Home