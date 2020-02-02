import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { logoutUser } from '../redux/thunks/UserThunks';
import axios from 'axios';
import { connect } from 'react-redux';

class Navigation extends Component {
  switchNavBar = params => {
    const { logoutUser, user } = this.props;
    console.log(logoutUser);
    switch (params.userType) {
      case 'Existing customer':
        return (
          <Nav>
            <Nav.Link href={`/user/${params.id}`}>
              {' '}
              {params.firstName} {params.lastName}{' '}
            </Nav.Link>
            <Button
              onClick={() => {
                logoutUser(user);
              }}
            >
              {' '}
              Logout{' '}
            </Button>
          </Nav>
        );
      case 'Admin':
        return (
          <Nav>
            <Nav.Link href="/products/add"> Add a Product </Nav.Link>
            <Nav.Link href={`/user/${params.id}`}>
              {' '}
              {params.firstName} {params.lastName}{' '}
            </Nav.Link>
            <Button
              onClick={() => {
                logoutUser(user);
              }}
            >
              {' '}
              Logout{' '}
            </Button>
          </Nav>
        );
      default:
        return (
          <Nav>
            <Nav.Link href="/signup"> Sign Up </Nav.Link>
            <Nav.Link href="/login"> Login </Nav.Link>
          </Nav>
        );
    }
  };
  render() {
    const { user } = this.props;
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Logo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/products">Shop</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href={`/shoppingcart/${user.id}`}>Cart</Nav.Link>
          {/* this is just a temporary link that goes no-where for now, will update once the cart component is ready */}
          {this.switchNavBar(user)}
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    logoutUser: user => dispatch(logoutUser(user))
  };
};

export default connect(mapStateToProps, mapDispatch)(Navigation);
