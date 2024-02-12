// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import TicketInfo from './pages/TicketInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/ticketsearch" element={<Home/>} />
        <Route path="/ticketdetails" element={<TicketInfo/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
