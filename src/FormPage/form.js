import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './forms.css';
import Header from '../Header/header';

function getFullName(params) {
  return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

const columns = [
  { field: 'firstName', headerName: 'First name', flex:0.1,
headerClassName:"custom-header", cellClassName:'selected-row '},
  { field: 'lastName', headerName: 'Last name', flex:0.1 ,
  headerClassName:"custom-header"},
  {
    field: 'fullName',
    headerName: 'Full name',
    flex:0.1 ,
    valueGetter: getFullName,
    headerClassName:"custom-header"
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  { id: 4, lastName: 'Stark', firstName: 'Arya' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
];

export default function FormHomePage() {
  return (
    <div>
<Header activeIndex={1}  />
<div className='top-header'>
<Box sx={{ height: 400, width: '100%' }}>
      <DataGrid   sx={{
       "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
        outline: "none",
      },
 "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
    outline: "0.5px solid #FFA500",
  
  },
      }} rows={rows} columns={columns}   />
    </Box>
    </div>
    </div>
   
  );
}