import * as actionTypes from './types';
import * as authService from '@/auth';

import history from '@/utils/history';

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.LOADING_REQUEST,
      payload: { loading: true },
    });
    const data = await authService.login({ loginData });

    if (data.success === true) {
      window.localStorage.setItem('isLoggedIn', true);
      window.localStorage.setItem('auth', JSON.stringify(data.result.admin));
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: data.result.admin,
      });
      history.push('/');
    } else {
      dispatch({
        type: actionTypes.FAILED_REQUEST,
        payload: data,
      });
    }
  };

export const register =
  ({ registerData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.LOADING_REQUEST,
      payload: { loading: true },
    });
    const data = await authService.register({ registerData });

    if (data.success === true) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: data,
      });
      // history.push('/login');
      window.location.href = '/login';  
    } else {
      dispatch({
        type: actionTypes.FAILED_REQUEST,
        payload: data,
      });
    }
  };

export const logout = () => async (dispatch) => {
  authService.logout();
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  history.push('/login');
};
