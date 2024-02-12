import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header/header';
import Home from './Homepage/home';
import BarsDataset from './Homepage/Barchart';
import MyComponent from './Homepage/modetest';
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;
