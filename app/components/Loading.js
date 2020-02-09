import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = ({ message }) => {
  return (
    <div>
      <div>Image</div>
      <div>{message}</div>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
