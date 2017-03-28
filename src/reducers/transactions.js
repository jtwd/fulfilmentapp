import {
  SET_TRANSACTIONS,
  SET_FLOW_DETAILS,
  SET_TRANSACTION_DETAILS,
  SET_EXPORT_DATA
} from '../actions/types';


const initialState = {
  list: false,
  details: false,
  transaction: false,
  exportData: false
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_TRANSACTIONS:
      return Object.assign({}, state, {
        list: action.transactions
      });

    case SET_FLOW_DETAILS:
      return Object.assign({}, state, {
        details: action.flowDetails
      });

    case SET_TRANSACTION_DETAILS:
      return Object.assign({}, state, {
        transaction: action.transaction
      });

    case SET_EXPORT_DATA:
      return Object.assign({}, state, {
        exportData: action.exportData.data
      });

    default:
      return state
  }
}