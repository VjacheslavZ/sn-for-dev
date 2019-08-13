import React, { createContext, Component } from 'react';
import { connect } from 'react-redux';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  render() {
    const { auth } = this.props;
    return (
      <AuthContext.Provider value={auth}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthContextProvider);
