import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/products">Shop</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/orders/:orderId/shoppingcart/:userId?">
          Cart
        </Nav.Link>{' '}
        {/* this is just a temporary link that goes no-where for now, will update once the cart component is ready */}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
