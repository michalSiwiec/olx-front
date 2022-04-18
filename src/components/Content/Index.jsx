import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import About from './about/Index.jsx';
import Contact from './contact/Index.jsx';
import RegisterUser from './register/Index.jsx';
import LoginUser from './login/Index.jsx';

const Content = () => (
  <Grid className="content">
    <Routes>
      <Route path="/" element={null} />
      <Route path="/services" element={<div>services</div>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<LoginUser />} />
    </Routes>
  </Grid>
);

export default Content;
