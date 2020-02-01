import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

export const AddProductFormSuccess = props => {
  console.log(props);
  return (
    <div
      style={{
        padding: '3rem',
        position: 'fixed',
        backgroundColor: 'white',
        border: '1px solid grey',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        outline: '9999px solid rgba(0,0,0,0.5)',
        zIndex: '10',
      }}
    >
      <h3>Your product has been created!</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button href="/products">&lt; Back to Products</Button>
        <Button onClick={e => props.closePopUp(e)}>Add another Product</Button>
      </div>
    </div>
  );
};
