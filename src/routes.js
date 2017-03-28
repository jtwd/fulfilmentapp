import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import TransactionsPage from './components/transactions/TransactionsPage';
import TransactionDetailsPage from './components/transactions/TransactionDetailsPage';

import requireAuth from './utils/requireAuth';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="transactions" component={requireAuth(TransactionsPage)} />
    <Route path="transactions/:id/:flowId" component={requireAuth(TransactionDetailsPage)} />
  </Route>
)
