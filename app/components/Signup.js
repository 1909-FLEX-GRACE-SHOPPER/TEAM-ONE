import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
const { Group, Label, Control, Text, Row, Col } = Form;
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
      },
    }
  }
  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      errors: {
        userNameError,
        emailError,
        passwordError,
        confirmPasswordError
      }
    } = this.state;
    return (
      <div className='container mt-4'>
        <div className='logo-medium'></div>
        <Form className='signup-form'>
          <Row>
            <Group as={ Col } controlId='firstName'>
              <Label>FIRST NAME</Label>
              <Control
                type='text'
                name='firstName'
                value={ firstName }
              />
            </Group>
            <Group as={ Col } controlId='lastName'>
              <Label>LAST NAME</Label>
              <Control
                type='text'
                name='lastName'
                value={ lastName }
              />
            </Group>
          </Row>
          <Group controlId='username'>
            <Label>USER NAME</Label>
            <Control
              type='text'
              name='username'
              value={ username }
            />
          </Group>
          <Group>
            <Label>Email address</Label>
            <Control type="email" placeholder="Enter email" />
            <Text className="text-muted">
              We'll never share your email with anyone else.
            </Text>
          </Group>
          <Group>
            <Label>PASSWORD</Label>
            <Control type="password" />
          </Group>
          <Group>
            <Label>CONFIRM PASSWORD</Label>
            <Control type="password" />
          </Group>
          <div>
            Already a user? <Link to={'/login'}>Login</Link>
          </div>
          <Button variant="primary" type="submit">
            SIGN UP
          </Button>
        </Form>
      </div>
    );
  };
}

const mapDispatch = dispatch => ({ createUser: form => dispatch(createUser(form)) })

const mapState = ({ user }) => ({ user })

export default connect(mapState, mapDispatch)(Signup);
