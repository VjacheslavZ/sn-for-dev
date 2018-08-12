import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import TextFieldCroup from '../common/TextFieldGroup';
import SelectListCroup from '../common/SelectListGroup';
import TextAreaFieldCroup from '../common/TextAreaFieldGroup';
import InputCroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};

		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		const {errors, displaySocialInputs} = this.state;

		let socialInputs;
		if(displaySocialInputs) {
			socialInputs = (
				<div>
					<InputCroup
						placeholder='Twiiter Profile URL'
						name='twitter'
						icon='fab fa-twitter'
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>

					<InputCroup
						placeholder='Facebook Page URL'
						name='facebook'
						icon='fab fa-facebook'
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>

					<InputCroup
						placeholder='Linkedin Page URL'
						name='linkedin'
						icon='fab fa-linkedin'
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>

					<InputCroup
						placeholder='YouTube Chanel URL'
						name='youtube'
						icon='fab fa-youtube'
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>

					<InputCroup
						placeholder='Instagram Chanel URL'
						name='instagram'
						icon='fab fa-youtube'
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			)
		}
		//Select options for status
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

		return (
			<div className='create-profile'>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create your profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out
							</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldCroup
									placeholder='* Profile handle'
									name='handle'
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nicname"
								/>

								<SelectListCroup
									placeholder='Status'
									name='status'
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>

								<TextFieldCroup
									placeholder='Company'
									name='company'
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>

								<TextFieldCroup
									placeholder='Website'
									name='website'
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Could be your own website or a company one"
								/>

								<TextFieldCroup
									placeholder='Location'
									name='location'
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City or city & state suggested (eg. Boston, MA)"
								/>

								<TextFieldCroup
									placeholder='* Skills'
									name='skills'
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (eg. HTML,CSS,JS,PHP)"
								/>

								<TextFieldCroup
									placeholder='Github Username'
									name='githubusername'
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="If you want your latest repos and a Github link, include your usernme"
								/>

								<TextAreaFieldCroup
									placeholder='Short Bio'
									name='bio'
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button
										type='button'
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}))
										}} className="btn btn-light">
										Add Social Network links
									</button>
									<span className='text-muted'>Optional</span>
								</div>

								{socialInputs}
								<input type="submit" value='Submit' className='btn btn-info btn-block mt-4'/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
		profile: state.profile,
		errors: state.errors,
	}
);

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));