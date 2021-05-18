import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Graphics from './pages/Graphics';
import Home from './pages/Home';

function Routes() {
  return (
    <BrowserRouter>
      <Route component={Home} path='/' exact/>
      <Route component={Graphics} path='/dados/:module'/>
      <Route component={Dashboard} path='/dashboard'/>
    </BrowserRouter>
  );
}

export default Routes;