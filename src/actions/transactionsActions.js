import axios from 'axios';

import {
  SET_TRANSACTIONS,
  SET_FLOW_DETAILS,
  SET_TRANSACTION_DETAILS,
  SET_EXPORT_DATA
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

export function fetchTransactionsExport(startDate, endDate, modState) {
  let url = `${API_URL.replace('admin', 'reporting')}/collect-reward/paypal-transactions?`;

  if (startDate) { url += `startDate=${startDate}&` }
  if (endDate) { url += `endDate=${endDate}&` }
  if (modState) { url += `moderationState=${modState}` }

  return dispatch => {
    return axios.get(url).then(res => {
      dispatch(setExportData(res))
    })
  }
}

export function resetTransactionsExport() {
  return dispatch => {
    dispatch(setExportData(false))
  }
}

export function setExportData(exportData) {
  console.log(exportData);
  return {
    type: SET_EXPORT_DATA,
    exportData
  }
}
