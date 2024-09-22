import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/header';
import './qrcode.css'
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { QRCodeGenerationAPI } from '../Http/QRCodeAPI';


function QRCod() {

  const [link, setLink]= useState(`${window.location.origin}/form/`);
  let { code } = useParams();
  const [copied, setCopied] = useState(false);
  const [oneTimeCode, setOneTimeCode] = useState('');
  const [oneDayCode, setDayCode] = useState('');
  const [textToCopy, setTextToCopy] = useState('');
 

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 9000); // Reset copied state after 1 second
  };
  const [display, setDisplay] = React.useState(false);
  const url = useNavigate();  
  const fetchData =async ()=>{
    try{
      const responseData = await QRCodeGenerationAPI(code)
      setDayCode(responseData['day'])
      setOneTimeCode(responseData['once'])
      const finalDate = link + responseData['day']
      setTextToCopy(finalDate)
    } catch(e){
      alert('An error occurred')
    }
  } 
  React.useEffect(() => {
   // const intervalId = setInterval(fetchData, 2 * 60 * 1000);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    
      if (user) {
        // User is signed in
       fetchData();
        setDisplay(true);
      } else {
        // User is not signed in, redirect to login
        url('/login');
      }
    });

    return () => {
      // Clean up the auth state listener
    //  clearInterval(intervalId);
      unsubscribe();
    };
  }, []);
  return (
    <div style={{
      display:display ? 'block':'none'
    }}>
         <Header activeIndex={0} />
         <div style={{height:'65px'}}>hhhhjjhjhjhjhjhjhhj</div>
         <div className='top-header'>
          
      <QRCode value={link+oneTimeCode} size={290} />
      </div>
      <div className='copy-link' >
        <div className='links'>{textToCopy}</div>
        <div style={{width:'60px',height:'0px'}}></div>
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
