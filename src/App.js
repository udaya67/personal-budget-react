import React from 'react';
import './App.css';
import HomePage from './HomePage/HomePage';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';
import LoginPage from './LoginPage/LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import AboutPage from './AboutPage/AboutPage';

function App() {
  return (
   <div className="App">
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
