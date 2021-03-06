import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './types';
//Register User
export const registerUser = (userData, history)=> dispatch => {
    axios.post('/api/users/register', userData)
    	.then(res => history.push('/login'))
    	.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		)
};
//Login get user token
export const loginUser = userData => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			//save to localStorage
			const {token} = res.data;
			//Set token to localStorage
			localStorage.setItem('jwtToken', token);
			//Set token to auth header
			setAuthToken(token);
			//Decode token to get user data
			const decoded = jwtDecode(token);
			//Set current user
			dispatch(setCurrentUser(decoded))

		})
		.catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
		})
};

//Set logged user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
};

//Log user out
export const logoutUser = () => dispatch => {
	//Remove token form localStorage
	localStorage.removeItem('jwtToken');
	//Remove aut header for future request
	setAuthToken(false);
	//Ser current user to {} which will ser isAuth to false
	dispatch(setCurrentUser({}))
};