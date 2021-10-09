import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

const withSpinner = (WrappedComponnent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponnent {...otherProps} />
    );
  };

  return Spinner;
};

export default withSpinner;
