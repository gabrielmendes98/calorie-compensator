import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Search} path="/search" />
    </Switch>
  );
};

export default Routes;
