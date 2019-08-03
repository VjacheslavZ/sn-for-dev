import React, { useState, useEffect, useReducer } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SET_FORM_DATA, SET_FORM_CHECKBOX } from '../../conststans';

import  TextFieldCroup  from '../common/TextFieldGroup';
import  TextAreaFieldCroup  from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';

const dispatchFormReducer = (dispatch, e) => {
	dispatch({ type: SET_FORM_DATA, payload: {name: e.target.name, value: e.target.value} });
};

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

const AddEducation = (props) => {
	const [errors, setErrors] = useState(props.errors);

	useEffect(() => {
		if(Object.keys(props.errors)) {
			setErrors(props.errors)
		}
	});

	const onSubmit = (e, state) => {
		e.preventDefault();

		const {addEducation: addEducationProp, history} = props;

		addEducationProp(state, history)
	};

	const [state, dispatch] = useReducer(educationFormReducer, {
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	return (
		<div className='add-education'>
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to='/dashboard' className='btn btn-light'>
							Go back
						</Link>
						<h1 className='display-4 text-center'>Add Education</h1>
						<p className='lead text-center'>\
							Add any school, bootvamp, etc that you have attempted
						</p>
						<small className="d-block pb-3">* = required fields</small>

						 <form onSubmit={(e) => onSubmit(e, state)}>
							<TextFieldCroup
								placeholder='* School'
								name='school'
								value={state.school}
								onChange={(e) => dispatchFormReducer(dispatch, e)}
								error={errors.school}
							/>

							<TextFieldCroup
								placeholder='* Degree or Certification'
								name='degree'
								value={state.degree}
								onChange={(e) => dispatchFormReducer(dispatch, e)}
								error={errors.degree}
							/>

							<TextFieldCroup
								placeholder='* Field of Study'
								name='fieldofstudy'
								value={state.fieldofstudy}
								onChange={(e) => dispatchFormReducer(dispatch, e)}
								error={errors.fieldofstudy}
							/>

							<h6>From date</h6>
							<TextFieldCroup
								type='date'
								name='from'
								value={state.from}
								onChange={(e) => dispatchFormReducer(dispatch, e)}
								error={errors.from}
							/>

							<h6>To date</h6>
							<TextFieldCroup
								type='date'
								name='to'
								value={state.to}
								onChange={(e) => dispatchFormReducer(dispatch, e)}
								error={errors.to}
								disabled={errors.disabled ? 'disabled' : ''}
							/>

							<div className="for-check mb-4">
								<label
									htmlFor='current'
									className='form-check-label'>
									Current Job
								</label>
								<input
									type="checkbox"
									className='form-check-input'
									name='current'
									value={state.current}
									checked={state.current}
									onChange={
										(e) =>
											dispatch({
												type: SET_FORM_CHECKBOX,
												payload: {name: e.target.name, value: e.target.checked}
											})
									}
									id='current'
								/>
							</div>

							<TextAreaFieldCroup
								placeholder='Program description'
								name='description'
								value={state.description}
								onChange={(e) => dispatchFormReducer(dispatch, e)}
								error={errors.description}
								info="Tell us about the program that you were in"
							/>

							<input
								type="submit"
								value="Submit"
								className='btn btn-info btn-block mt-4'
							/>
						 </form>

					</div>
				</div>
			</div>
		</div>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const MapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(MapStateToProps, { addEducation })(
	withRouter(AddEducation)
);
