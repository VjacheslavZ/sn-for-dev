import React, { createContext } from "react";
import { useSelector } from 'react-redux';

export const ErrorContext = createContext();

const ErrorContextProvider = props => {
  const errors = useSelector(state => state.errors);

  return (
    <ErrorContext.Provider value={errors}>
      {props.children}
    </ErrorContext.Provider>
  )
};

export default ErrorContextProvider;
