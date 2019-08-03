import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { defaultMemoize, createSelectorCreator } from 'reselect';

import  TextFieldCroup  from '../common/TextFieldGroup';
import  TextAreaFieldCroup  from '../common/TextAreaFieldGroup';

import { addExperience } from '../../actions/profileActions';
import useFormData from '../../hooks';

const AddExperience = (props) => {
	const [errors, setErrors] = useState(props.errors);

	useEffect(() => {
		if(Object.keys(props.errors)) {
			setErrors(props.errors)
		}
	});

	const [state, dispatchFormReducer ] = useFormData({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
		disabled: false,
	});

	const onSubmit = (e) => {
		e.preventDefault();

		const {addExperience: addExperienceProp, history} = props;
		addExperienceProp(state, history)
	};

	return (
		<div className='add-experience'>
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to='/dashboard' className='btn btn-light'>
							Go back
						</Link>
						<h1 className='display-4 text-center'>Add Experience</h1>
						<p className='lead text-center'>Add any job or position that you have had in the past or current</p>
						<small className="d-block pb-3">* = required fields</small>

						<form onSubmit={onSubmit}>
							<TextFieldCroup
								placeholder='* Company'
								name='company'
								value={state.company}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.company}
							/>

							<TextFieldCroup
								placeholder='* Job title'
								name='title'
								value={state.title}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.title}
							/>

							<TextFieldCroup
								placeholder='Location'
								name='location'
								value={state.location}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.location}
							/>

							<h6>From date</h6>
							<TextFieldCroup
								type='date'
								name='from'
								value={state.from}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.from}
							/>

							<h6>To date</h6>
							<TextFieldCroup
								type='date'
								name='to'
								value={state.to}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.to}
								disabled={state.disabled ? 'disabled' : ''}
							/>

							<div className="for-check mb-4">
								<input
									type="checkbox"
									className='form-check-input'
									name='current'
									value={state.current}
									checked={state.current}
									onChange={(e) => dispatchFormReducer(e)}
									id='current'
								/>
								<label
									htmlFor='current'
									className='form-check-label'>
									Current Job
								</label>
							</div>

							<TextAreaFieldCroup
								placeholder='Job description'
								name='description'
								value={state.description}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.description}
								info="Tell us about the position"
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
	)
};

AddExperience.propTypes = {
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired,
};

const getErrors = (state) => state.errors;

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const getErrorsSelector = createDeepEqualSelector(
	getErrors,
	errors => errors
);

const mapStateToProps = state => {
	return {
		errors: getErrorsSelector(state)
	}
};


export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
