/*
 * This file is only used by the client to instantiate the router
 * in the react-mount node
 */
import "babel-polyfill"; // Required for es6 shims
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

// Instantiate router
ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('react-mount')
);
