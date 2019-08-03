import React from 'react';
import { SET_FORM_CHECKBOX, SET_FORM_DATA, SET_FORM_ERRORS } from '../conststans';

const useFormData = (initialData) => {
	const formReducer = (state, action) => {
		console.log(action)
		switch (action.type) {
			case SET_FORM_DATA:
				return {
					...state,
					[action.payload.name]: action.payload.value
				};
			case SET_FORM_CHECKBOX:
				return  {
					...state,
					[action.payload.name]: action.payload.value
				};
			case SET_FORM_ERRORS:
				return  {
					...state,
					errors: action.payload
				};
			default:
				return {
					...state
				}
		}
	};

	const [state, dispatch] = React.useReducer(formReducer, initialData);

	const dispatchFormReducer = (e) => {
		if (e.target.type === 'checkbox') {
			dispatch({ type: SET_FORM_CHECKBOX, payload: { name: e.target.name, value: e.target.checked }});
			return;
		}

		dispatch({ type: SET_FORM_DATA, payload: {name: e.target.name, value: e.target.value} });
	};

	const dispatchActionFormReducer = (action)=> dispatch({ type: action.type , payload: action.payload });

	return [state, dispatchFormReducer, dispatchActionFormReducer]
};

export default useFormData;