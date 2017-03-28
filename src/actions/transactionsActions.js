import axios from 'axios';

import {
  SET_TRANSACTIONS,
  SET_FLOW_DETAILS,
  SET_TRANSACTION_DETAILS,
} from './types';

import { API_URL } from '../index';

export function setTransactions(transactions) {
  return {
    type: SET_TRANSACTIONS,
    transactions,
  }
}

export function setFlowDetails(flowDetails) {
  return {
    type: SET_FLOW_DETAILS,
    flowDetails,
  }
}

export function setTransactionDetails(transaction) {
  return {
    type: SET_TRANSACTION_DETAILS,
    transaction,
  }
}

export function fetchTransactions(modState = 'Pending') {
  return dispatch => {
    return axios.get(`${API_URL}paypal-transaction/evidence-moderation?moderationState=${modState}&state=Executed&pageSize=8000&orderBy=CreatedDate&orderByDescending=true`).then(res => {
      dispatch(setTransactions(res.data.Items));
    })
  }
}

export function fetchFlowDetails(id) {
  return dispatch => {
    return axios.get(`${API_URL}flow/${id}`).then(res => {
      dispatch(setFlowDetails(res.data.Item));
    })
  }
}

export function fetchTransactionDetails(id) {
  return dispatch => {
    return axios.get(`${API_URL}paypal-transaction/${id}`).then(res => {
      dispatch(setTransactionDetails(res.data.Item));
    })
  }
}
