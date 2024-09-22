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
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Grid, IconButton } from '@mui/material';
import MyChartComponent from '../Homepage/Barchart';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddNewForm from '../AddNewFoem/AddNewForm';
import FormViewDefine from '../FormMethodsView/FormViewDefine';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FormManagement from '../FormManagement/FormManagement';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { FormListAPI } from '../Http/ViewFormData';
import { async } from '@firebase/util';
import { SimpleDialog } from '../QR CODE/QRCodeChoice';
import { FormInstancesAPI } from '../Http/QRCodeAPI';




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
  

 function FormHomePage({ data , type1}) {
  const [open, setOpen] = React.useState(false);
  const [qrOptions, setQrOptions] = React.useState(false); 
  const [qrOptionsID, setQrOptionsID] = React.useState(null); 
  const [formManagementID, setFormManagementID] = React.useState(null); 
  const [idCounter, setIdCounter] = React.useState(1); // Initial value of the counter
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const [qrOptionsInstance, setQrOptionsInstance] = React.useState([]); 
  const [openQR, setOpenQR] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  const handleClickOpenQR = () => {
    setOpenQR(true);
  };

  const handleCloseQR = (value) => {
    setOpenQR(false);
    setSelectedValue(value);
  };

  const generateUniqueId = () => {
    const newId = idCounter;
    setIdCounter(prevCounter => prevCounter + 1); // Increment the counter for the next ID
    return newId.toString(); // Convert to string as MUI DataGrid expects string IDs
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [rows,setRows]= React.useState(data == null ? [
    {id:''}
  ]:data)
 
  const getdata =() => {
    const fetchData = async () => {
      try {
        const responseData = await FormListAPI();
     if (responseData.length ===0){}else{
      const formattedRows =await responseData.map((row, index) => ({
        ...row,
      
        id: (index + 1).toString(),
      }));
      setRows(formattedRows);
     
     }
    
      } catch (error) {
        console.error('Error fetching form data:', error);
        
      }
    };
    if (data) {
     
      const formattedRows = data.map((row, index) => ({
        ...row,
        // Generate auto ID based on index (add 1 to start from 1)
        id: (index + 1).toString(),
      }));
      setRows(formattedRows);
    } else{
   fetchData()
    }
  }
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

  

  const columns = [
    {
        field: 'id',
        headerName: '',
        flex: 0.1,
        editable: false,
        headerClassName: "custom-header"
    },
    ...keys
        .filter(key => key !== 'id')
        .map(key => ({
            field: key,
            headerName: formatColumnName(key), 
            flex: 0.1,
            editable: true,
            headerClassName: "custom-header"
        }))
];
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
                 icon={<ManageAccountsIcon />}
                 label="Form Management"
                onClick={async()=>{
                  const indexNumber =await parseInt(params.id, 10);
                  const tedt = await rows[indexNumber-1].formid
                await setFormManagementID(tedt)
                 
                 await handleClickOpen()
                }}
                
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
             onClick={async()=>{
              try{
                const id = getFormIdById(params.id);
              await  setQrOptionsInstance([])
                const responseData1 = await FormInstancesAPI(id);
              //  alert(JSON.stringify(responseData1.data))
              for (let item of responseData1.data ){
                qrOptionsInstance.push(item)
              }
            
                handleClickOpenQR()
              } catch(e){
                alert('An error occurred')
              }
             
          //  url(`/qrcode/${getFormIdById(params.id)}`)
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
React.useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      getdata()
      setDisplay(true)
    } else {
     
      setDisplay(false)
      url('/login');
    }
  });

  return () => unsubscribe();
}, [qrOptionsInstance]);
  if (display){

    return (
      <div  >
       
  <Header activeIndex={1}  />
  <FormManagement view={open} form={formManagementID}/>
  <SimpleDialog
        selectedValue={selectedValue}
        open={openQR}
        onClose={handleCloseQR}
        options= {qrOptionsInstance}
      />
  <div style={{height:'70px',color:'white'}}>hasjjhsahj</div>
  <div style={{color:'black', height:'0px',marginLeft:'70vw'}}>
 {data ==null ?  <AddNewForm /> :''}
  <FormViewDefine  view={qrOptions} id={qrOptionsID} />
  </div>
  
  <div className='top-header'>
  <Grid container spacing={2}>
    {data != null ?  <div style={{display:'none'}}>
      <Grid item style={{width:'100vw'}}>
      <Item>
        <MyChartComponent data={resultList} charttype={'bar'} />
      </Item>
    </Grid>
    
    </div>
   
   :null}
    <div style={{height:'20px', color:'white'}}>ddfdfdf</div>
    
    <Box sx={{ marginLeft:'1%', width: '99%' }}>
        <DataGrid autoHeight  components={{
      Toolbar: GridToolbar,
    }} slots={{ toolbar: GridToolbar }}
    csvOptions={{
      fileName: 'custom_file_name', // Set your desired CSV file name here
    }}
    processRowUpdate={(updatedRow, originalRow)=>{
          const value = updatedRow['id'];
          
        }} editMode="row" rows={rows} columns={columns}   />
      </Box>
      </Grid>
      </div>
      </div>
     
    );
  }else{}
 
}

export default FormHomePage