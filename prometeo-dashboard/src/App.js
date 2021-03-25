import React from 'react';
import AppContext, { useAppContext } from './context/app';
import Router from './Router';
import './App.scss';

function App() {
  return (
    <AppContext.Provider value={useAppContext()}>
      <Router />
    </AppContext.Provider>
  );
}

export default App;
