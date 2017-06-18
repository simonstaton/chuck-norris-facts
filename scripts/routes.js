import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import Base from './pages/base';
import Index from './pages/index';
import NotFound from './pages/404';
import Fact from './pages/fact';

export default [
  <Route path='/' component={Base}>
    <IndexRoute component={Index}></IndexRoute>
    <Route path='/:category' component={Fact}/>
    <Route path='404' component={NotFound}/>
    <Redirect from='*' to='/404'/>
  </Route>
];

