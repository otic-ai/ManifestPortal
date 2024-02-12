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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 

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

  return (
    <div>
    <div style={{ position: 'fixed', width: '100%', zIndex: 1001, top: 0 , overflow:'hidden'}}>
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
          <img src='download.png' className='header-title' sx={{ flexGrow: 1 }}>
            
            </img>
            <Typography className='header-title' sx={{ flexGrow: 1 }}>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon style={{ color: 'orange' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <IconButton
              size="large"
              style={{ color: 'orange' }}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
             // onClick={handleMenuClick}
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
