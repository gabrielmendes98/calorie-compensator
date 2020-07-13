import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Information from './pages/Information';
import SetWeight from './pages/SetWeight';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Search} path="/search" />
      <Route component={Information} path="/information/:id" />
      <Route component={SetWeight} path="/set-weight" />
    </Switch>
  );
};

export default Routes;
