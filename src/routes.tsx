import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Information from './pages/Information';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Search} path="/search" />
      <Route component={Information} path="/information/:id" />
    </Switch>
  );
};

export default Routes;
