import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header/header';
import Home from './Homepage/home';
import BarsDataset from './Homepage/Barchart';
import MyComponent from './Homepage/modetest';
import HomeGrid from './Homepage/HomeDisplay';
import FormHomePage from './FormPage/form';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeGrid />} />
      <Route path="/forms" element={<FormHomePage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
