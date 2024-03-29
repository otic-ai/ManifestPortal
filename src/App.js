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


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeGrid />} />
      <Route path="/forms" element={<FormHomePage />} />
      <Route path="/qrcode/:code" element={<QRCod />} />
      <Route path="/data/:formid" element={<FormData />} />
      <Route path="/formview/:formid" element={<FormView />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
