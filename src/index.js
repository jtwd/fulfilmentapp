import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { setCurrentUser } from './actions/authActions';

import routes from './routes';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';


// Root element in DOM
const rootEle = document.getElementById('app');
if (!rootEle) console.error('Root DOM element is missing. Looking for ID of "app"');

// API URL
export const API_URL = rootEle.getAttribute('data-api-url');
if(!API_URL) console.error('API URL is missing from the root DOM element. Looking for "data-api-url"');

// Configure store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f // enable Redux Dev Tools
  )
);

// check for an existing jwt token (is logged in)
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(localStorage.jwtToken));
}

// render app
render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  rootEle
);