import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldCroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const { auth, history } = this.props;
		if(auth.isAuthenticated) {
			history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value})
	};

	onSubmit(e) {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const { history, registerUser: registerUserProp } = this.props;
		const newUser = { name, email, password, password2 };

		registerUserProp(newUser, history)
	}

	render() {
		const { errors, name, email, password, password2 } = this.state;

		console.log(this.props)

		return (
			<div>
				<div className="register">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">Sign Up</h1>
								<p className="lead text-center">Create your DevConnector account</p>

								<form noValidate onSubmit={this.onSubmit}>

									<TextFieldCroup
										placeholder='Name'
										name='name'
										value={name}
										onChange={this.onChange}
										error={errors.name}
									/>

									<TextFieldCroup
										placeholder='Email Address'
										name='email'
										type='email'
										value={email}
										onChange={this.onChange}
										error={errors.email}
										info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
									/>

									<TextFieldCroup
										placeholder='Password'
										name='password'
										type='password'
										value={password}
										onChange={this.onChange}
										error={errors.password}
									/>

									<TextFieldCroup
										placeholder='Confirm Password'
										name='password2'
										type='password'
										value={password2}
										onChange={this.onChange}
										error={errors.password2}
									/>

									<input type="submit" className="btn btn-info btn-block mt-4" />

								</form>

							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.shape({isAuthenticated: PropTypes.bool}).isRequired,
	errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
