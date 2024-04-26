import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header/header';
import Home from './Homepage/home';
import BarsDataset from './Homepage/Barchart';
import MyComponent from './Homepage/modetest';
import HomeGrid from './Homepage/HomeDisplay';
import FormHomePage from './FormPage/form';
import FormData from './DataPage/Datapage';
import QRCode from './QR CODE/qrcode';
import QRCod from './QR CODE/qrcode';
import { FormLabel } from '@mui/material';
import FormView from './FormPage/FormView';
import app from './Firebase';
import { initializeApp } from "firebase/app";
import SignInSide from './Login/login';
import SignUp from './SignUp/signup';
import ResetPassword from './ResetPassword/Resetpassword';
import FormFill from './FormFill/FormFill';



function App() {
 //   <Route path="/" element={<HomeGrid />} />

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<SignInSide />} />
   
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/" element={<FormHomePage />} />
      <Route path="/qrcode/:code" element={<QRCod />} />
      <Route path="/data/:formid" element={<FormData />} />
      <Route path="/formview/:formid" element={<FormView />} />
      <Route path="/form/:formid" element={<FormFill />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
