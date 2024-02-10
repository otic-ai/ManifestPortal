import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header/header';
import Home from './Homepage/home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
