import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Footer from './components/Footer';

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
