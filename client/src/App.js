import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => 
  <Fragment>

    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </Fragment>

export default App;
