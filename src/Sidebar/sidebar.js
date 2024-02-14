import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sidebar.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import EditNoteIcon from '@mui/icons-material/EditNote';
import StorageIcon from '@mui/icons-material/Storage';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


const Sidebartask = ({activeIndex }) => {
  const items = [
    {tagName: 'Home',  tag: <HomeIcon className='icon'/>,
  page:'/'},
  {tagName: 'Forms',  tag: <EditNoteIcon className='icon'/>,
  page:'/forms'},
  {tagName: 'Data',  tag: <StorageIcon className='icon'/>,
  page:'/'},
  {tagName: 'Admin',  tag: <AdminPanelSettings className='icon'/>,
  page:'/'},
   
   
  ];


  return (
    <ul className="sidebar-list">
       {items.map((item, index) => (
          <li key={index} className={activeIndex === index ? 'actived' : ''}><Link className="link" to={`${item.page}`}>
            <span></span>
            <span >{item.tag}</span> 
            <span className='sidebar-words'>{item.tagName}</span> 
            </Link>
          </li>
        ))}
      </ul>
  )
}

export default Sidebartask