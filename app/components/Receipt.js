import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

const Receipt = props => {
    console.log(props)
  return (
    <div>
      <h3>Your order #{ props.orders.id.split('-')[0] } is being processed.</h3>
      {
        // props.order.products.map(product => {
        //   return (
        //     <div>
        //       <p><span>{ product.name }</span><span>{ product.price }</span></p>
        //     </div>
        //   )
        // })
      }
      <Button href='/'>Return to the Shop</Button>
    </div>
  )
}

const mapState = ({ orders }) => ({ orders })

export default connect(mapState)(Receipt)