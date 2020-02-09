import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div
      style={
        {
          width: 'calc(100%/4)',
          margin: '1ren',
          minHeight: '300px',
          fontFamily: 'Roboto',
        }
      }
    >
      <Link to={`/products/${product.id}`}
        style={
          {
            textDecoration: 'none',
            color: 'black',
          }
        }
      >
        <div>
          <div>
            <img
              variant='bottom'
              src={product.productImage}
              style={
                {
                  width: '100%'
                }
              }
            />
          </div>
          <div
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1rem',
              }
            }
          >
            <div
              style={
                {
                  fontSize: '14px',
                  textTransform: 'capitalize',
                }
              }>{product.productName}</div>
            <div 
              style={
                {
                  fontSize: '14px',
                }
              }
            >${product.unitPrice}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
