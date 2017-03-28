import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import transactions from './reducers/transactions';


export default combineReducers({
  flashMessages,
  auth,
  transactions,
});