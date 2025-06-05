import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Links from './views/components/Navigation/Links';
import AppRoutes from './views/components/Navigation/Routes';

function App() {
  return (
    <Router>
      <Links />
      <AppRoutes />
    </Router>
  );
}

export default App;
