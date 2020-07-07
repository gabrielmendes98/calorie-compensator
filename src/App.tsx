import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
