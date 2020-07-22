import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Information from './pages/Information';
import SetWeight from './pages/SetWeight';
import Compensation from './pages/Compensation';
import About from './pages/About';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Search} path="/search" />
      <Route component={Information} path="/information/:id" />
      <Route component={SetWeight} path="/set-weight" />
      <Route component={Compensation} path="/compensation-info" />
      <Route component={About} path="/about" />
    </Switch>
  );
};

export default Routes;
