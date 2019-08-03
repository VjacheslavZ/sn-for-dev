import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextFieldCroup from '../common/TextFieldGroup'

import useFormData from '../../hooks';

const Login = props => {
	const [errors, setErrors] = useState(props.errors);

	useEffect(() => {
		if(Object.keys(props.errors)) {
			setErrors(props.errors)
		}
	});

	const [state, dispatchFormReducer] = useFormData({ email: '', password: '' });

	useEffect(() => {
		if(props.auth.isAuthenticated) {
			props.history.push('/dashboard');
		}
	}, [props.auth.isAuthenticated]);

	const onSubmit = (e) => {
		e.preventDefault();

		props.loginUser(state);
	};

	return (
		<div className="login">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Log In</h1>
						<p className="lead text-center">Sign in to your DevConnector account</p>

						<form onSubmit={onSubmit}>

							<TextFieldCroup
								placeholder='Email Address'
								name='email'
								type="email"
								value={state.email}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.email}
							/>

							<TextFieldCroup
								placeholder='Password'
								name='password'
								type="password"
								value={state.password}
								onChange={(e) => dispatchFormReducer(e)}
								error={errors.password}
							/>

							<input type="submit" className="btn btn-info btn-block mt-4"/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
