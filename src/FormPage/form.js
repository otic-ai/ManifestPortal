import * as React from 'react';
import Box from '@mui/material/Box';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbar,
  } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './forms.css';
import Header from '../Header/header';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import MyChartComponent from '../Homepage/Barchart';
import QrCode2Icon from '@mui/icons-material/QrCode2';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function countOccurrences(data) {
  const counts = {};

  // Iterate over each object in the data array
  data.forEach(obj => {
    // Iterate over each key in the object
    Object.keys(obj).forEach(key => {
      // Skip the 'id' key
      if (key !== 'id') {
        const value = obj[key];
        // If the key doesn't exist in counts, initialize it as an empty object
        if (!counts[key]) {
          counts[key] = {};
        }
        // If the value doesn't exist in counts[key], initialize it as 1
        if (!counts[key][value]) {
          counts[key][value] = 1;
        } else {
          // If the value already exists in counts[key], increment its count
          counts[key][value]++;
        }
      }
    });
  });
  
  return counts;
}
  

 function FormHomePage({ data }) {
  const [idCounter, setIdCounter] = React.useState(1); // Initial value of the counter
  const [filteredRows, setFilteredRows] = React.useState([]);
  const generateUniqueId = () => {
    const newId = idCounter;
    setIdCounter(prevCounter => prevCounter + 1); // Increment the counter for the next ID
    return newId.toString(); // Convert to string as MUI DataGrid expects string IDs
  };

  const [rows,setRows]= React.useState(data == null ? [
    { formid:'sdjhhsdhj', id: '1', last_Name: 'Snow', first_Name: 'Jon' },
    {formid:'sdjhhsdhj', id: '2', last_Name: 'Lannister', first_Name: 'Cersei' },
    { formid:'sdjhhsdhj',id: '3', last_Name: 'Lannister', first_Name: 'Jaime' },
    {formid:'sdjhhsdhj', id: '4', last_Name: 'Stark', first_Name: 'Arya' },
    { formid:'sdjhhsdhj',id: '5', last_Name: 'Targaryen', first_Name: 'Daenerys' },
   
  ]:data)
  function getFormIdById(id) {
    const row = rows.find(row => row.id === id);
    return row ? row.formid : null;
}
  
function formatColumnName(name) {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

 
  const url = useNavigate();
  const occurrences = countOccurrences(rows);
  
  // Aggregate the counts of each value across all objects
  const aggregateCounts = {};
  Object.keys(occurrences).forEach(key => {
    aggregateCounts[key] = {};
    Object.keys(occurrences[key]).forEach(value => {
      aggregateCounts[key][value] = Object.values(occurrences[key]).reduce((acc, count) => acc + count, 0);
    });
  });

  // Convert the aggregateCounts object into the desired list format
  const resultList = [aggregateCounts];
  const keys = Object.keys(rows[0]).filter(key => key !== 'formid');

  const columns = keys.map(key => ({
    field: key,
    headerName: formatColumnName(key), 
    flex: key =='id'? undefined :0.1,
    editable:key =='id'?  false:true,
    headerClassName: "custom-header"
  }));

  const addActions = async ()=>{
    if (data==null){
      await columns.push(   
        {
             field: 'actions',
             type: 'actions',
             width: 80,
             getActions: (params) => [
               <GridActionsCellItem
                 icon={<StorageIcon />}
                 label="View Data"
                 onClick={()=>{
                   url(`/data/${getFormIdById(params.id)}`)
                 }}
               //  onClick={deleteUser(params.id)}
               />,
          
             <GridActionsCellItem
                 icon={<DeleteIcon />}
                 label="Delete Data"
               // onClick={DataView()}
                
                 showInMenu
               />  ,
               <GridActionsCellItem
                 icon={<DesignServicesIcon />}
                 label="Form Design"
                 onClick={()=>{
                  url(`/formview/${getFormIdById(params.id)}`)
                }}
                 showInMenu
               />,

             <GridActionsCellItem
             icon={<QrCode2Icon />}
             label="QR Code"
             onClick={()=>{
              url(`/qrcode/${getFormIdById(params.id)}`)
            }}
             showInMenu
           /> 
             ],
           },
        )
    } else {
      await columns.push(   
        {
             field: 'actions',
             type: 'actions',
             width: 80,
             getActions: (params) => [
              
          
             <GridActionsCellItem
                 icon={<DeleteIcon />}
                 label="Delete Data"
               // onClick={DataView()}
               />  ,
              
             ],
           },
        )
    }
  
  }
addActions()
  
  return (
    <div>
<Header activeIndex={1}  />
<div className='top-header'>
<Grid container spacing={2}>
  {data != null ?  <div>
    <Grid item style={{width:'100vw'}}>
    <Item>
      <MyChartComponent data={resultList} charttype={'bar'} />
    </Item>
  </Grid>
  
  </div>
 
 :null}
  <div style={{height:'20px', color:'white'}}>ddfdfdf</div>
  
  <Box sx={{ marginLeft:'1%', width: '99%' }}>
      <DataGrid autoHeight onFilterModelChange={(dat)=>{
        const filter = rows.filter(row =>{
          return row.columnName.toLowerCase().includes(dat.items[0].value.toLowerCase());
        })
        setFilteredRows(filter)
      }} components={{
    Toolbar: GridToolbar,
  }} processRowUpdate={(updatedRow, originalRow)=>{
        const value = updatedRow['id'];
        
      }} editMode="row" sx={{
       "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
        outline: "none",
      },
 "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
    outline: "0.5px solid #FFA500",
  
  },
 '& .dx-datagrid-focus-overlay':{
  outline: '0.5px solid #FF0000',
}
      }} rows={rows} columns={columns}   />
    </Box>
    </Grid>
    </div>
    </div>
   
  );
}

export default FormHomePage