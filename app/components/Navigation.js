import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>Home</Nav.Link>
        <Nav.Link>About</Nav.Link>
        <Nav.Link>Shop</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link>Login</Nav.Link>
        <Nav.Link>Cart</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
