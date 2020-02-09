import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
const { Group, Label, Control, Text, Row, Col } = Form;
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { createUser } from '../redux/thunks/UserThunks';

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
        firstNameError: '',
        lastNameError: '',
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
      }
    };
  }

  validate = (field, value) => {
    const { errors } = this.state;

    switch (field) {
      case 'firstName':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              firstNameError: 'Required Field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              firstNameError: ''
            }
          })
        }
        break;

      case 'lastName':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              lastNameError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              lastNameError: ''
            }
          })
        }
        break;

      case 'email':
        if (!value.match(/\S+@\S+\.\S+/)) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email not valid'
            }
          });
        } else if(!value) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              emailError: ''
            }
          });
        }
        break;

      case 'password':
        if (!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Password not valid'
            }
          });
        } else if(!value) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              passwordError: ''
            }
          });
        }
        break;

      case 'confirmPassword':
        if (value !== this.state.password) {
          this.setState({
            errors: {
              ...errors,
              confirmPasswordError: 'Passwords must match'
            }
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              confirmPasswordError: ''
            }
          });
        }
      default:
        break;
    }
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate(name, value));
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { id } = this.props.user;
    this.props.createUser({ ...this.state, id });
    this.setState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      errors: {
        firstNameError,
        lastNameError,
        usernameError,
        emailError,
        passwordError,
        confirmPasswordError
      }
    } = this.state;

    return (
      <div className='container mt-4'>
        <div className='logo-medium'></div>

        <Form
          className='signup-form'
          style={
            {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }
        >
          <Row
            style={
              {
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                }
              }
            >
            <Group
              as={Col}
              controlId='firstName'
              style={{ width: 'calc(50% - 1rem)' }}
            >
              <Label>
                FIRST NAME{' '}
                <span style={{ color: 'red', fontSize: '10px' }}>
                  *required
                </span>
              </Label>
              <Control
                type='text'
                name='firstName'
                value={firstName}
                onChange={this.handleOnChange}
                isInvalid={ !!firstNameError }
              />
              <Control.Feedback
                type='invalid'
                className='text-danger'
              >
                { firstNameError }
              </Control.Feedback>
            </Group>

            <Group
              as={Col}
              controlId='lastName'
              style={{ width: 'calc(50% - 1rem)' }}
            >
              <Label>
                LAST NAME{' '}
                <span style={{ color: 'red', fontSize: '10px' }}>
                  *required
                </span>
              </Label>
              <Control
                type='text'
                name='lastName'
                value={lastName}
                onChange={this.handleOnChange}
                isInvalid={ !!lastNameError }
              />
              <Control.Feedback
                type='invalid'
                className='text-danger'
              >
                { lastNameError }
              </Control.Feedback>
            </Group>
          </Row>

          <Group
            controlId='username'
            style={
              {
                width: '50%',
              }
            }
          >
            <Label>USER NAME</Label>
            <Control
              type='text'
              name='username'
              value={username}
              onChange={this.handleOnChange}
              isInvalid={ !!usernameError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              {usernameError}
            </Control.Feedback>
          </Group>

          <Group
            controlId='email'
            style={
              {
                width: '50%',
              }
            }
          >
            <Label>
              Email address{' '}
              <span style={{ color: 'red', fontSize: '10px' }}>*required</span>
            </Label>
            <Control
              type='email'
              name='email'
              value={email}
              onChange={this.handleOnChange}
              isInvalid={ !!emailError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              {emailError}
            </Control.Feedback>
          </Group>

          <Group
            controlId='password'
            style={
              {
                width: '50%',
              }
            }
          >
            <Label>
              PASSWORD{' '}
              <span style={{ color: 'red', fontSize: '10px' }}>
                *required<br></br>Password must:<br></br>contain letters and
                numbers<br></br>Be between 8 and 20 characters in length
              </span>
            </Label>
            <Control
              type='password'
              name='password'
              value={password}
              onChange={this.handleOnChange}
              isInvalid={ !!passwordError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              {passwordError}
            </Control.Feedback>
          </Group>

          <Group
            controlId='confirmPassword'
            style={
              {
                width: '50%',
              }
            }
          >
            <Label>CONFIRM PASSWORD</Label>
            <Control
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={this.handleOnChange}
              isInvalid={ !!confirmPasswordError }
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { confirmPasswordError }
            </Control.Feedback>
          </Group>

          <div>
            Already a user? <Link to={'/login'}>Login</Link>
          </div>

          <Button
            disabled={
              !firstName ||
              !lastName ||
              !email ||
              !password ||
              !confirmPassword ||
              emailError ||
              passwordError ||
              confirmPasswordError
            }
            style={
              {
                margin: '1rem',
                backgroundColor: 'black',
                border: 'none',
                borderRadius: '0',
                width: '300px'
              }
            }
            type='submit'
            onClick={this.handleOnSubmit}
          >
            SIGN UP
          </Button>
        </Form>
      </div>
    );
  }
}

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => {
  return {
    createUser: form => dispatch(createUser(form))
  };
};

export default connect(mapState, mapDispatch)(Signup);
