import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { connect } from 'react-redux';
import { statusMessage } from '../redux/actions';

import { SUCCESS, FAIL } from '../redux/thunks/utils';

export const ToastComponent = props => {
  const { status, message } = props;
  switch (status) {
    case SUCCESS:
      return (
        <Toast
          style={
            {
              position: 'fixed',
              left: '90%',
              zIndex: '10'
            }
          }
          onClose={() => props.resetStatus()}
        >
          <Toast.Header className="bg-success">
            <strong className="mr-auto text-white">Success!</strong>
          </Toast.Header>
          <Toast.Body className="text-success">{message}</Toast.Body>
        </Toast>
      );
    case FAIL:
      return (
        <Toast
          style={{ position: 'fixed', left: '90%', zIndex: '10' }}
          onClose={() => props.resetStatus()}
        >
          <Toast.Header className="bg-danger">
            <strong className="mr-auto text-white">Error!</strong>
          </Toast.Header>
          <Toast.Body className="text-danger">{message}</Toast.Body>
        </Toast>
      );
    default:
      return null;
  }
};

const mapDispatch = dispatch => {
  return {
    resetStatus: () =>
      dispatch(
        statusMessage({
          status: null,
          text: ''
        })
      )
  };
};

export default connect(null, mapDispatch)(ToastComponent);
