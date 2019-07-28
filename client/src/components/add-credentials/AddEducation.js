import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import  TextFieldCroup  from '../common/TextFieldGroup';
import  TextAreaFieldCroup  from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
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

		const {school, degree, fieldofstudy, from, to, current, description} = this.state;
		const {addEducation: addEducationProp, history} = this.props;

		const eduData = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		addEducationProp(eduData, history)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onCheck() {
		const {disabled, current} = this.state;
		this.setState({
			disabled: !disabled,
			current: !current
		});
	}

	render() {
		const {
			errors, school, degree, fieldofstudy,
			from, to, disabled, current, description
		} = this.state;

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

							<form onSubmit={this.onSubmit}>
								<TextFieldCroup
									placeholder='* School'
									name='school'
									value={school}
									onChange={this.onChange}
									error={errors.school}
								/>

								<TextFieldCroup
									placeholder='* Degree or Certification'
									name='degree'
									value={degree}
									onChange={this.onChange}
									error={errors.degree}
								/>

								<TextFieldCroup
									placeholder='* Field of Study'
									name='fieldofstudy'
									value={fieldofstudy}
									onChange={this.onChange}
									error={errors.fieldofstudy}
								/>

								<h6>From date</h6>
								<TextFieldCroup
									type='date'
									name='from'
									value={from}
									onChange={this.onChange}
									error={errors.from}
								/>

								<h6>To date</h6>
								<TextFieldCroup
									type='date'
									name='to'
									value={to}
									onChange={this.onChange}
									error={errors.to}
									disabled={disabled ? 'disabled' : ''}
								/>

								<div className="for-check mb-4">
									{/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
									<label
										htmlFor='current'
										className='form-check-label'>
										Current Job
									</label>
									<input
										type="checkbox"
										className='form-check-input'
										name='current'
										value={current}
										checked={current}
										onChange={this.onCheck}
										id='current'
									/>
								</div>

								<TextAreaFieldCroup
									placeholder='Program description'
									name='description'
									value={description}
									onChange={this.onChange}
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
	}
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	// profile: PropTypes.object.isRequired,
	errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const MapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(MapStateToProps, { addEducation })(
	withRouter(AddEducation)
) ;
