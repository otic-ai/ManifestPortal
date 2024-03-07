import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import Header from '../Header/header';
import './qrcode.css'
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';


function QRCod() {

  const [link, setLink]= useState('https://www.exahsjhdhjsdhhsdjhsjddjhdjhsmple.com');
  let { code } = useParams();
  const [copied, setCopied] = useState(false);

  const textToCopy = link;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 9000); // Reset copied state after 1 second
  };
  
  return (
    <div>
         <Header activeIndex={0} />
         <div className='top-header'>
      <QRCode value={link} size={290} />
      </div>
      <div className='copy-link' >
        <div className='links'>{link}</div>
        <div style={{width:'20px'}}></div>
        <div className='button'>
        <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
      <Button variant="outlined" style={{color:'orange', fontWeight:'bold', border:'0px solid orange'}} startIcon={<ContentCopyIcon />}>
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </CopyToClipboard>
        </div>
      </div>
    
    </div>
  );
}

export default QRCod;
