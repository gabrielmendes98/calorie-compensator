import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main>
        <Routes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
