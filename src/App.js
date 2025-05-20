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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
