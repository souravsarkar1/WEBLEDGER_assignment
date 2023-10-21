import { LOGIN_FAIL, LOGIN_FAIL_GITHUB, LOGIN_REQUEST, LOGIN_REQUEST_GITHUB, LOGIN_SUCCESS, LOGIN_SUCCESS_GITHUB, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes"

const initialState = {
    isLoginLoading: false,
    isSignupLoading: false,
    isLoginError: false,
    isSignupError: false,
    isAuth: false,
    isLoginLoading_Github: false,
    token: "",
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, isLoginLoading: true }
        case LOGIN_SUCCESS:
            return { ...state, isLoginLoading: false, isAuth: true, token: payload }
        case LOGIN_FAIL:
            return { ...state, isLoginLoading: false, isLoginError: true }
        case LOGIN_REQUEST_GITHUB:
            return { ...state, isLoginLoading_Github: true }
        case LOGIN_SUCCESS_GITHUB:
            return { ...state, isLoginLoading_Github: false, isAuth: true, token: payload }
        case LOGIN_FAIL_GITHUB:
            return { ...state, isLoginLoading_Github: false, isLoginError: true }
        case REGISTER_REQUEST:
            return { ...state, isSignupLoading: true }
        case REGISTER_SUCCESS:
            return { ...state, isSignupLoading: false }
        case REGISTER_FAIL:
            return { ...state, isSignupLoading: false, isSignupError: true }
        case LOGOUT:
            return { ...state, isAuth: false, token: "" }
        default:
            return state
    }
}