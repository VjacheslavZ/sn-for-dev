import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import TextFieldCroup from '../common/TextFieldGroup';
import SelectListCroup from '../common/SelectListGroup';
import TextAreaFieldCroup from '../common/TextAreaFieldGroup';
import InputCroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

import { clearErrorsWithDispatch } from '../../actions/postActions';
import { useFormData } from '../../hooks';

import { SET_FORM_DATA } from '../../conststans';

const CreateProfile = props => {
	const { errors } = props;
	useEffect(() => {
		return () => props.clearErrorsWithDispatch();
	}, []);

	const [state, dispatchFormReducer, dispatchActionFormReducer] = useFormData({
		displaySocialInputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
	});

	const options = [
		{label: 'Select Professional Status', value: 0},
		{label: 'Developer', value: 'Developer'},
		{label: 'Junior Developer', value: 'Junior Developer'},
		{label: 'Senior Developer', value: 'Senior Developer'},
		{label: 'Manager', value: 'Manager'},
		{label: 'Student or Learning', value: 'Student or Learning'},
		{label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
		{label: 'Intern', value: 'Intern'},
		{label: 'Other', value: 'Other'},
	];

	const onSubmit = (e) => {
		e.preventDefault();

		props.createProfile(state, props.history);
	};

	const socialInputs = (
		<div>
			<InputCroup
				placeholder='Twiiter Profile URL'
				name='twitter'
				icon='fab fa-twitter'
				value={state.twitter}
				onChange={(e) => dispatchFormReducer(e)}
				error={errors.twitter}
			/>

			<InputCroup
				placeholder='Facebook Page URL'
				name='facebook'
				icon='fab fa-facebook'
				value={state.facebook}
				onChange={(e) => dispatchFormReducer(e)}
				error={errors.facebook}
			/>

			<InputCroup
				placeholder='Linkedin Page URL'
				name='linkedin'
				icon='fab fa-linkedin'
				value={state.linkedin}
				onChange={(e) => dispatchFormReducer(e)}
				error={errors.linkedin}
			/>

			<InputCroup
				placeholder='YouTube Chanel URL'
				name='youtube'
				icon='fab fa-youtube'
				value={state.youtube}
				onChange={(e) => dispatchFormReducer(e)}
				error={errors.youtube}
			/>

			<InputCroup
				placeholder='Instagram Chanel URL'
				name='instagram'
				icon='fab fa-youtube'
				value={state.instagram}
				onChange={(e) => dispatchFormReducer(e)}
				error={errors.instagram}
			/>
		</div>
	);

	return (
		<div className='create-profile'>
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Create your profile</h1>
						<p className="lead text-center">
							Let{'\''}s get some information to make your profile stand out
						</p>
						<small className="d-block pb-3">* = required fields</small>

						<form onSubmit={onSubmit}>
							<TextFieldCroup
								placeholder='* Profile handle'
								name='handle'
								value={state.handle}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.handle}
								info="A unique handle for your profile URL. Your full name, company name, nicname"
							/>

							<SelectListCroup
								placeholder='Status'
								name='status'
								value={state.status}
								onChange={(e) => dispatchFormReducer(e)}
								options={options}
								error={errors.status}
								info="Give us an idea of where you are at in your career"
							/>

							<TextFieldCroup
								placeholder='Company'
								name='company'
								value={state.company}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.company}
								info="Could be your own company or one you work for"
							/>

							<TextFieldCroup
								placeholder='Website'
								name='website'
								value={state.website}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.website}
								info="Could be your own website or a company one"
							/>

							<TextFieldCroup
								placeholder='Location'
								name='location'
								value={state.location}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.location}
								info="City or city & state suggested (eg. Boston, MA)"
							/>

							<TextFieldCroup
								placeholder='* Skills'
								name='skills'
								value={state.skills}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.skills}
								info="Please use comma separated values (eg. HTML,CSS,JS,PHP)"
							/>

							<TextFieldCroup
								placeholder='Github Username'
								name='githubusername'
								value={state.githubusername}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.githubusername}
								info="If you want your latest repos and a Github link, include your usernme"
							/>

							<TextAreaFieldCroup
								placeholder='Short Bio'
								name='bio'
								value={state.bio}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.bio}
								info="Tell us a little about yourself"
							/>

							<div className="mb-3">
								<button
									type='button'
									onClick={() => dispatchActionFormReducer({
										type: SET_FORM_DATA,
										payload: {name: 'displaySocialInputs', value: !state.displaySocialInputs},
									})}
									className="btn btn-light">
									Add Social Network links
								</button>
								<span className='text-muted'>Optional</span>
							</div>
							 {state.displaySocialInputs ? socialInputs : null}
							<input type="submit" value='Submit' className='btn btn-info btn-block mt-4'/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
};

CreateProfile.propTypes = {
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
		profile: state.profile,
		errors: state.errors,
	}
);

export default connect(mapStateToProps, { createProfile, clearErrorsWithDispatch })(withRouter(CreateProfile));