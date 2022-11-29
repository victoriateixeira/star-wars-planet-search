import React from 'react';
import './App.css';

import AppProvider from './context/AppProvider';
import Home from './components/Home';


function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
 
  );
}

export default App;
