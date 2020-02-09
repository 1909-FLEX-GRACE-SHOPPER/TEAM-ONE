import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { logoutUser, getGitHubData } from '../redux/thunks/UserThunks';
import { connect } from 'react-redux';

class Navigation extends Component {
  componentDidMount() {
    const { getGitHubUserData } = this.props;
    getGitHubUserData();
  }
  switchNavBar = params => {
    const { logoutUser, user, gitHubUser } = this.props;
    switch (params.userType) {
      case 'GitHub User':
        return (
          <Nav>
            <Nav.Link href={`/user/${params.id}`}> {gitHubUser.name} </Nav.Link>
            <Button
              onClick={() => {
                logoutUser(user.id);
              }}
            >
              Logout
            </Button>
          </Nav>
        );
      case 'Existing customer':
        return (
          <Nav>
            <Nav.Link href={`/user/${params.id}`}>
              {params.firstName} {params.lastName}
            </Nav.Link>
            <Button
              onClick={() => {
                logoutUser(user.id);
              }}
            >
              Logout
            </Button>
          </Nav>
        );
      case 'Admin':
        return (
          <Nav>
            <Nav.Link href="/products/add"> Add a Product </Nav.Link>
            <Nav.Link href={`/user/${params.id}`}>
              {params.firstName} {params.lastName}
            </Nav.Link>
            <Button
              onClick={() => {
                logoutUser(user.id);
              }}
            >
              Logout
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
    const { user, gitHubUser } = this.props;
    console.log('this is the PROPS', this.props);
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Logo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/products/page/1">Shop</Nav.Link>
          <Nav.Link href="/gallery">Photo Booth</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href={`/cart`}>Cart</Nav.Link>
          <Nav.Link href={`/wishlist`}>Wishlist</Nav.Link>
          {/* this is just a temporary link that goes no-where for now, will update once the cart component is ready */}
          {this.switchNavBar(user, gitHubUser)}
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    gitHubUser: state.gitHubData
  };
};

const mapDispatch = dispatch => {
  return {
    logoutUser: userId => dispatch(logoutUser(userId)),
    getGitHubUserData: () => dispatch(getGitHubData())
  };
};

export default connect(mapStateToProps, mapDispatch)(Navigation);
