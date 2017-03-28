import axios from 'axios';

import { SET_CURRENT_USER } from './types';

import { API_URL } from '../index';

import setAuthorizationToken from '../utils/setAuthorizationToken';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function login(data) {
  const newData = {
    Username: data.identifier,
    Password: data.password,
  };
  return dispatch => {
    return axios.post(`${API_URL}system/token`, newData).then(res => {
      const token = res.data.Item.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(token));
    })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}