import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Links from './views/components/Navigation/Links';
import AppRoutes from './views/components/Navigation/Routes';
import Header from './views/components/Header/Header';


function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
