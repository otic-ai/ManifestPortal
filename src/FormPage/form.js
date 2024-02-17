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
import './forms.css';
import Header from '../Header/header';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function getFullName(params) {
  return `${params.row.first_Name || ''} ${params.row.last_Name || ''}`;
}


function formatColumnName(name) {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

const rows = [
    { formid:'sdjhhsdhj', id: '1', last_Name: 'Snow', first_Name: 'Jon' },
    {formid:'sdjhhsdhj', id: '2', last_Name: 'Lannister', first_Name: 'Cersei' },
    { formid:'sdjhhsdhj',id: '3', last_Name: 'Lannister', first_Name: 'Jaime',dateCreated:'sdjhhsdhj' },
    {formid:'sdjhhsdhj', id: '4', last_Name: 'Stark', first_Name: 'Arya' },
    { formid:'sdjhhsdhj',id: '5', last_Name: 'Targaryen', first_Name: 'Daenerys' },
   
  ];

  
  function getFormIdById(id) {
    const row = rows.find(row => row.id === id);
    return row ? row.formid : null;
}
  const keys = Object.keys(rows[0]).filter(key => key !== 'formid');

  // Creating column values for datagrid columns
  const columns = keys.map(key => ({
    field: key,
    headerName: formatColumnName(key), // Capitalizing the first letter
    flex: key =='id'? undefined :0.1,
    editable:key =='id'?  false:true,
    headerClassName: "custom-header"
  }));
  columns.push(   
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
      //  onClick={deleteUser(params.id)}
      />,
      <GridActionsCellItem
        icon={<StorageIcon />}
        label="View Data"
     //   onClick={toggleAdmin(params.id)}
        showInMenu
      />,
      <GridActionsCellItem
        icon={<DesignServicesIcon />}
        label="Form Design"
     //   onClick={duplicateUser(params.id)}
        showInMenu
      />,
    ],
  },)




export default function FormHomePage() {
  return (
    <div>
<Header activeIndex={1}  />
<div className='top-header'>
<Box sx={{  width: '100%' }}>
      <DataGrid autoHeight  components={{
    Toolbar: GridToolbar,
  }} processRowUpdate={(updatedRow, originalRow)=>{
        const value = updatedRow['id'];
        alert(JSON.stringify(getFormIdById(value)))
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
    </div>
    </div>
   
  );
}