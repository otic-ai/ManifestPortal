import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './test.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import BarsDataset from './Homepage/Barchart';
import ManifestActivity from './ManifestActivity/manifestactivity';
import MyChartComponent from './Homepage/Barchart';
import MyComponent from './Homepage/modetest';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'darks' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const dummyData = [
    { year: 2001, data: { november: 3, october: 434, january: 384 } },
    { year: 2011, data: { november: 3, october: 434, january: 384 } },
    { year: 2002, data: { november: 5, october: 534, january: 284 } },
    { year: 2012, data: { november: 4, october: 634, january: 184 } },
    { year: 2003, data: { november: 6, october: 634, january: 184 } },
    { year: 2013, data: { november: 7, october: 734, january: 284 } }
  ];
const ManifestInfo2 = styled(Grid)({
  height: '50%', // Make the container occupy 50% of its parent's height
});
const yourData = [
    ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
    ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
    ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
    ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
    ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
  ];
  
export default function BasicGrid() {
  return (
    <Box className='manifest-info2w'  sx={{ flexGrow: 1 }}>
      <Grid container style={{height:'100%'}} spacing={0.2}>
        <Grid item className='pie'>
          <Item style={{height:'95%',width:''}} ></Item>
        </Grid>
        <Grid item  className='data'>
          <Item  style={{height:'95%',width:''}} >
           
        
          </Item>
        </Grid>
        <Grid item className='graph'>
        <Item  style={{height:'95%',width:''}} >
          
        <div style={{display:'flex',flexDirection:'row',height:'90%'}}>
                <div className='mixed-bar-position'></div>
                <MyChartComponent data={dummyData} />
            {/*    <ManifestActivity data={yourData} /> */}
            </div>
          </Item>
        </Grid>
        
      </Grid>
    </Box>
  );
}
