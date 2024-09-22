import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './header.css';
import Sidebartask from '../Sidebar/sidebar';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { ChangeManifestAPI, getManifestAPI } from '../Http/ChangeManifest';
import { useNavigate } from 'react-router-dom';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const Header = ({activeIndex}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [top100Films, setTop100Films] = useState([]);
  const [defaultManifest, setDefaultManifest] = useState(null);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await getManifestAPI()
      
      setTop100Films(response['data'])
      setDefaultManifest(response['default'])
    }
    fetchData()
  },[])
  const handleSelect = async(event, value) => {
    if (value) {
     
await ChangeManifestAPI(JSON.stringify(value))
      window.location.reload();

    }
  };

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  const flatProps = {
    options: top100Films.map((option) => option.title),
  };
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const url = useNavigate();
  return (
    <div>
    <div style={{ position: 'fixed', width: '100vw', zIndex: 1001, top: 0 , overflow:'hidden'}}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: 'black' }} className="appbar" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              style={{ color: 'orange' }}
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <div></div>
          <img src='download.png' className='header-title' sx={{ flexGrow: 1 }} style={{display:'none'}}>
            
            </img>
            <Typography className='header-title' sx={{ flexGrow: 1 }}>
            </Typography>
          
            <Search>
            <Autocomplete
         onChange={handleSelect}     
  style={{ color: 'white', width: '50vw', minWidth: '200px', maxWidth: '300px' }}
  {...defaultProps}
  id="blur-on-select"
  blurOnSelect
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search "
      variant="standard"
      InputProps={{
        ...params.InputProps,
        style: { color: 'white' }, // Set input text color to white
      }}
      InputLabelProps={{
        style: { color: 'white' }, // Set label color to white
      }}
    />
  )}
/>

            
            </Search>
            <IconButton
              size="large"
              style={{ color: 'orange' }}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={()=>{
                url(`/profile/${defaultManifest}`)
              }}
            //  onClick={handleMenu}
            color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
       
      </Box>
    </div>
    <div  className={`sidebar ${isOpen ? 'app' : 'app2'}`}>
          <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
            {/* Your sidebar content goes here */}
            <Sidebartask  activeIndex={activeIndex}/>
          </div>
        </div>
    </div>
  )
}

export default Header;
