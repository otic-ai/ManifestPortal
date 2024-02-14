import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput, TextField, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    { value: 'hasjh', name: 'First Item' },
  { value: 'sdjksdjjks', name: 'Second Item' },
  { value: 'xyz123', name: 'Third Item' },
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: 'orange',
      boxShadow: 'orange',
    },
  },
}));

export default function CustomizeForm() {
  const [timeperiod, setTimeperiod] = React.useState('');
  const [year, setYear] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [charttype, SetCharttype] = React.useState('');
  const handletimeperiod = (event) => {
    setTimeperiod(event.target.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeCharttype = (event) => {
    SetCharttype(event.target.value);
  };
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleFormName = (event) => {
    const {
      target: { value },
    } = event;
    
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      
      <Typography id="demo" style={{ color: '#36454F',minWidth:'200px' }}>Data</Typography>
      <div style={{height:'10px'}}></div>
        <Select
         labelId="demo"
         name='data'
         required
          value={personName}
          onChange={handleFormName}
        
          MenuProps={MenuProps}
          input={<BootstrapInput />}
        >
       {names.map((item) => (
  <MenuItem
    key={item.value}
    value={item.value}
    style={getStyles(item.value, personName, theme)}
  >
    {item.name}
  </MenuItem>
))}

        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      
      <Typography id="demo" style={{ color: '#36454F',minWidth:'200px' }}>Chart Type</Typography>
      <div style={{height:'10px'}}></div>
        <Select
         labelId="demo"
         name='charttype'
         required
          value={charttype}
          onChange={handleChangeCharttype}
        
          MenuProps={MenuProps}
          input={<BootstrapInput />}
        >
  <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="line">
           Line
          </MenuItem>
          <MenuItem value="bar">
           Bar 
          </MenuItem>
          <MenuItem value="pie">
           Pie
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1,minWidth:200  }} variant="standard">
      <Typography id="demo" style={{ color: '#36454F' }}>Time Period</Typography>
      <div style={{height:'10px'}}></div>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          name='time'
          value={timeperiod}
          onChange={handletimeperiod}
          input={<BootstrapInput />}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Yearly</MenuItem>
          <MenuItem value={20}>Monthly</MenuItem>
          <MenuItem value={30}>Weekly</MenuItem>
        </Select>
      </FormControl>
      {timeperiod==20 || timeperiod==30 ? <FormControl fullWidth sx={{ m: 1,minWidth:200  }} variant="standard">
      <Typography id="demo" style={{ color: '#36454F' }}>Year</Typography>
      <div style={{height:'10px'}}></div>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={year}
          name='year'
          onChange={handleChangeYear}
          input={<BootstrapInput />}
          required
        >
          
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {names.map((item) => (
  <MenuItem
    key={item.value}
    value={item.value}
    style={getStyles(item.value, personName, theme)}
  >
    {item.name}
  </MenuItem>
))}

        </Select>
      </FormControl>:null}
      {timeperiod==30?<FormControl fullWidth sx={{ m: 1,minWidth:200  }} variant="standard">
      <Typography id="demo" style={{ color: '#36454F' }}>Month</Typography>
      <div style={{height:'10px'}}></div>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={month}
          name='month'
          onChange={handleChangeMonth}
          input={<BootstrapInput />}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {names.map((item) => (
  <MenuItem
    key={item.value}
    value={item.value}
    style={getStyles(item.value, personName, theme)}
  >
    {item.name}
  </MenuItem>
))}

        </Select>
      </FormControl>:null}
      
    </div>
  );
}
