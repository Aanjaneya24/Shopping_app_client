import axios from "axios";
import { returnErrors} from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Check token and load user

export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    
    const config = tokenconfig(getState);
    // Debug log
    console.log('Loading user with token:', config.headers['x-auth-token']);

    api.get('/api/auth/user', config)
    .then(res => {
        console.log('User loaded successfully:', res.data);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    })
    .catch(err => {
        console.error('Load user error:', {
            status: err.response?.status,
            data: err.response?.data,
            headers: err.config?.headers,
            message: err.message
        });
        dispatch(returnErrors(err.response?.data || 'Authentication failed', err.response?.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

// register user
export const register = ({name,email,password}) => dispatch => {
    const body = JSON.stringify({name,email,password});
    api.post('/api/users', body)
        .then(res => {
            console.log('Registration successful:', res.data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.error('Registration error:', err.response?.data);
            dispatch(returnErrors(err.response?.data, err.response?.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};
// login user
export const login = ({email, password}) => dispatch => {
    const body = JSON.stringify({email, password});
    
    console.log('Attempting login with:', { email });
    
    api.post('/api/auth', body)
        .then(res => {
            console.log('Login successful:', res.data);
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.error('Login failed:', {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message
            });
            dispatch(returnErrors(err.response?.data || 'Login failed', err.response?.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// logout user
export const logout=()=>{
    return {
        type: LOGOUT_SUCCESS
    };
};
// Setup config/headers and token
export const tokenconfig = (getState) => {
    const token = getState().auth.token;
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token || '' // Always include token header
        }
    }
    return config;
};




