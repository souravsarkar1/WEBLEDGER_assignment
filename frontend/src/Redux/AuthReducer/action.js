import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes";
import axios from 'axios'
export const login = (data) => (dispatch) => {
  // Complete login logic here
  dispatch({ type: LOGIN_REQUEST });
  return axios.post('https://webleader.onrender.com/user/login', data).then((res) => {
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token })
  }).catch((err) => {
    dispatch({ type: LOGIN_FAIL })
  })
};


export const register = (data) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return axios.post(`https://webleader.onrender.com/user/register`, data).then((res) => {
    console.log(res.data);
    dispatch({ type: REGISTER_SUCCESS });
  }).catch((err) => {
    console.log(err.message);
    dispatch({ type: REGISTER_FAIL });
  })
}
