import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldCroup from '../common/TextFieldGroup';

import { useFormData } from '../../hooks';

const Register = props => {
	const [state, dispatchFormReducer] = useFormData({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	useEffect(() => {
		if(props.auth.isAuthenticated) {
			props.history.push('/dashboard');
		}
	}, [props.auth.isAuthenticated]);

	const onSubmit = (e) => {
		e.preventDefault();

		const { history, registerUser: registerUserProp } = props;

		registerUserProp(state, history);
	};

	return (

		<div>
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>

							<form noValidate onSubmit={onSubmit}>

								<TextFieldCroup
									placeholder='Name'
									name='name'
									value={state.name}
									onChange={(e) => dispatchFormReducer(e)}
									error={props.errors.name}
								/>

								<TextFieldCroup
									placeholder='Email Address'
									name='email'
									type='email'
									value={state.email}
									onChange={(e) => dispatchFormReducer(e)}
									error={props.errors.email}
									info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
								/>

								<TextFieldCroup
									placeholder='Password'
									name='password'
									type='password'
									value={state.password}
									onChange={(e) => dispatchFormReducer(e)}
									error={props.errors.password}
								/>

								<TextFieldCroup
									placeholder='Confirm Password'
									name='password2'
									type='password'
									value={state.password2}
									onChange={(e) => dispatchFormReducer(e)}
									error={props.errors.password2}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" />

							</form>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
};



Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.shape({isAuthenticated: PropTypes.bool}).isRequired,
	errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
