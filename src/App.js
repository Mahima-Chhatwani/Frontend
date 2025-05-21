import React from 'react';
import Login from './pages/Login';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path= "/login" element = {<Login />}  />
          <Route path= "/" element = {<div>Home Page</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
