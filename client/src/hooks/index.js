import React from 'react';
import { SET_FORM_CHECKBOX, SET_FORM_DATA } from '../conststans';

const useFormData = (initialData) => {
	const educationFormReducer = (state, action) => {
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
			default:
				return {
					...state
				}
		}
	};

	const [state, dispatch] = React.useReducer(educationFormReducer, initialData);

	const dispatchFormReducer = (e) => {
		if (e.target.type === 'checkbox') {
			dispatch({ type: SET_FORM_CHECKBOX, payload: { name: e.target.name, value: e.target.checked }});
			return
		}

		dispatch({ type: SET_FORM_DATA, payload: {name: e.target.name, value: e.target.value} });
	};
	return [state, dispatchFormReducer]
};

export default useFormData;