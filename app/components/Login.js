import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { logInUser } from '../redux/thunks/UserThunks';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.logIn(this.state);
  };
  render() {
    const { authError } = this.props.errorMessage;
    const { logInStatus } = this.props.userLoginStatus;
    return (
      <Fragment>
        {!logInStatus ? (
          <Form>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Col sm="5">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label> Password</Form.Label>
              <Col sm="5">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
            <div>{authError ? authError : null}</div>
            <Nav.Link href="/signup"> Sign up </Nav.Link>
            <Button onClick={this.onSubmit}> Log In! </Button>
          </Form>
        ) : (
          <h2>
            {' '}
            {`Hi ${this.props.user.firstName} Welcome to the Juul Store`} !
          </h2>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.authentication,
    userLoginStatus: state.authentication,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: credentials => dispatch(logInUser(credentials))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
export { Login };
