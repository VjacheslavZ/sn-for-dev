import React, {useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {loginUser} from '../../actions/authActions';
import TextFieldCroup from '../common/TextFieldGroup'
import {useFormData} from '../../hooks';
import {ErrorContext} from "../../contexts/ErrorContextProvider";

const Login = props => {
  const [state, dispatchFormReducer] = useFormData({email: '', password: ''});
  const errors = useContext(ErrorContext);
  const {auth, history} = props;

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth.isAuthenticated]);

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
  )
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {loginUser})(Login));
