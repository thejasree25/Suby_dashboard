import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './vendorDashboard/pages/LandingPage';
import './App.css';
import NavBar from './vendorDashboard/components/NavBar';
import Login from './vendorDashboard/components/forms/Login';
import NotFound from './vendorDashboard/components/forms/NotFound';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
