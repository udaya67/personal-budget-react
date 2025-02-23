import React from 'react';
import './App.css';
import HomePage from './HomePage/HomePage';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import LoginPage from './LoginPage/LoginPage';
import BudgetCharts from './components/BudgetCharts';
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
          <Route path="/charts" element={<BudgetCharts />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
