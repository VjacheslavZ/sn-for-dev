import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { defaultMemoize, createSelectorCreator } from 'reselect';
import { isEqual } from 'lodash';

import  TextFieldCroup  from '../common/TextFieldGroup';
import  TextAreaFieldCroup  from '../common/TextAreaFieldGroup';
import  TextFieldCroupState from "../common/TextFieldGroupState";

import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
	constructor(props) {
		super(props);

		this.state = {
			company: '',
			title: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps) {
			this.setState({ errors: nextProps.errors })
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const {
			to, from, title, company, current, location, description
		} = e.target;

		const expData = {
			to: to.value,
			from: from.value,
			title: title.value,
			company: company.value,
			current: current.value,
			location: location.value,
			description: description.value,
		};
		this.props.addExperience(expData, this.props.history)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onCheck() {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	}

	render() {
		const { errors } = this.state;

		return (
			<div className='add-experience'>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to='/dashboard' className='btn btn-light'>Go back</Link>

							<h1 className='display-4 text-center'>Add Experience</h1>
							<p className='lead text-center'>Add any job or position that you have had in the past or current</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldCroupState
									type='text'
									placeholder='* Company'
									name='company'
									error={errors.company}
								/>

								<TextFieldCroupState
									type='text'
									placeholder='* Job title'
									name='title'
									error={errors.title}
								/>

								<TextFieldCroupState
									type='text'
									placeholder='Location'
									name='location'
									error={errors.location}
								/>

								<h6>From date</h6>
								<TextFieldCroupState
									type='date'
									name='from'
									error={errors.from}
								/>

								<h6>To date</h6>
								<TextFieldCroup
									type='date'
									name='to'
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>

								<div className="for-check mb-4">
									<input
										type="checkbox"
										className='form-check-input'
										name='current'
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
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
									value={this.state.description}
									onChange={this.onChange}
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
		);
	}
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired,
};

const getErrors = (state) => state.errors;

const createDeepEqualSelector = createSelectorCreator(
	defaultMemoize,
	isEqual
);

const getErrorsSelector = createDeepEqualSelector(
	getErrors,
	(errors) => errors
);

const mapStateToProps = state => {
	return {
		errors: getErrorsSelector(state)
	}
};


export default connect(mapStateToProps, { addExperience })(
	withRouter(AddExperience)
);
