import React from "react";
import { connect } from 'react-redux';

export const ErrorContext = React.createContext();

class ErrorContextProvider extends React.Component {
  render() {
    const { errors } = this.props;
    return (
      <ErrorContext.Provider value={errors}>
        {this.props.children}
      </ErrorContext.Provider>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(ErrorContextProvider);
