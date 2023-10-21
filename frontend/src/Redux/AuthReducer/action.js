import { LOGIN_FAIL, LOGIN_FAIL_GITHUB, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_SUCCESS_GITHUB, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes";
import axios from 'axios'
export const login = (data,toast) => (dispatch) => {
  // Complete login logic here
  dispatch({ type: LOGIN_REQUEST });
  return axios.post('https://webleader.onrender.com/user/login', data).then((res) => {
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    toast({
      title: res.data.msg,
      description: "Login succesfully completed",
      status: 'success',
      duration: 3000,
      isClosable: true,
      position : 'top'
    })
  }).catch((err) => {
    dispatch({ type: LOGIN_FAIL });
    toast({
      title: 'Wrong Information',
      description: "Email or password incorrect",
      status: 'error',
      duration: 3000,
      isClosable: true,
      position : 'top'
    })
  })
};


export const register = (data,toast) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return axios.post(`https://webleader.onrender.com/user/register`, data).then((res) => {
    console.log(res.data);
    dispatch({ type: REGISTER_SUCCESS });
    toast({
      title: res.data.msg,
      description: res.data.msg,
      status: 'success',
      duration: 4000,
      isClosable: true,
      position : "top"
    })
  }).catch((err) => {
    console.log(err.message);
    dispatch({ type: REGISTER_FAIL });
    toast({
      title: 'Something went wrong',
      description: "Something went wrong",
      status: 'success',
      duration: 4000,
      isClosable: true,
      position : "top"
    })
  })
}

export const logout = (toast)=>(dispatch)=>{
  dispatch({type : LOGOUT});
  toast({
    title: 'Logout Sucessfull',
      description: "Logout Sucessfull",
      status: 'success',
      duration: 4000,
      isClosable: true,
      position : "top"
  })
}


export const githubAuth =(toast)=>(dispatch)=>{
    dispatch({type :LOGIN_SUCCESS_GITHUB});
    axios.get(`https://webleader.onrender.com/auth/github`).then(res=>{
      console.log(res.data.token);
      dispatch({type : LOGIN_SUCCESS_GITHUB,payload : res.data.token});
      toast({
        title: 'Login GitHub Sucessfull',
          description: "Login GitHub Sucessfull",
          status: 'success',
          duration: 4000,
          isClosable: true,
          position : "top"
      })
    }).catch((err)=>{
      dispatch({type : LOGIN_FAIL_GITHUB});
      toast({
        title: 'Something went wrong',
          description: "Something went wrong",
          status: 'err',
          duration: 4000,
          isClosable: true,
          position : "top"
      })
    })
}