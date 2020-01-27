import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
const { Group, Label, Control, Text, Row, Col } = Form;
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import ToastComponent from './Toasts'

import { createUser } from '../redux/thunks/UserThunks';
import { statusMessage } from '../redux/actions';

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

  validate = (field, value) => {
    const { errors } = this.state

    switch(field) {
      case 'email':
        if(!value.match(/\S+@\S+\.\S+/)) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email not valid'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              emailError: ''
            }
          })
        }
        break;

      case 'password':
        if(!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Password not valid'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              passwordError: ''
            }
          })
        }
        break;

      case 'confirmPassword':
        if(value !== this.state.password) {
          this.setState({
            errors: {
              ...errors,
              confirmPasswordError: 'Passwords must match'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              confirmPasswordError: ''
            }
          })
        }
      default:
        break;
    }
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate(name, value))
  }

  handleOnSubmit = e => {
    const { id } = this.props.user
    e.preventDefault()
    this.props.createUser({ ...this.state, id });
      this.setState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
  }

  render() {
    const { status, text } = this.props.statusMessage
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      errors: {
        usernameError,
        emailError,
        passwordError,
        confirmPasswordError
      },
    } = this.state;

    return (
      <div className='container mt-4'>
        <div className='logo-medium'></div>

        <Form className='signup-form'>
          <ToastComponent status={ status } message={ text } />
          <Row style={{ dispaly: 'flex', justifyContent: 'space-between' }}>
            <Group as={ Col } controlId='firstName' style={{ width: 'calc(50% - 1rem)' }}>
              <Label>FIRST NAME <span style={{ color: 'red', fontSize: '10px' }}>*required</span></Label>
              <Control
                type='text'
                name='firstName'
                value={ firstName }
                onChange={ this.handleOnChange }
              />
            </Group>

            <Group as={ Col } controlId='lastName' style={{ width: 'calc(50% - 1rem)' }}>
              <Label>LAST NAME <span style={{ color: 'red', fontSize: '10px' }}>*required</span></Label>
              <Control
                type='text'
                name='lastName'
                value={ lastName }
                onChange={ this.handleOnChange }
              />
            </Group>
          </Row>

          <Group controlId='username'>
            <Label>USER NAME</Label>
            <Control
              type='text'
              name='username'
              value={ username }
              onChange={ this.handleOnChange }
            />
            <p show={ usernameError }>{ usernameError }</p>
          </Group>

          <Group controlId='email'>
            <Label>Email address <span style={{ color: 'red', fontSize: '10px' }}>*required</span></Label>
            <Control
              type='email'
              name='email'
              value={ email }
              onChange={ this.handleOnChange }
            />
            <Text className="text-muted">
              We'll never share your email with anyone else.
            </Text>
            <p show={ emailError }>{ emailError }</p>
          </Group>

          <Group controlId='password'>
            <Label>PASSWORD <span style={{ color: 'red', fontSize: '10px' }}>*required<br></br>Password must:<br></br>contain letters and numbers<br></br>Be between 8 and 20 characters in length</span></Label>
            <Control
              type='password'
              name='password'
              value={ password }
              onChange={ this.handleOnChange }
            />
            <p show={ passwordError }>{ passwordError }</p>
          </Group>

          <Group controlId='confirmPassword'>
            <Label>CONFIRM PASSWORD</Label>
            <Control
              type='password'
              name='confirmPassword'
              value={ confirmPassword }
              onChange={ this.handleOnChange }
            />
            <p show={ confirmPasswordError }>{ confirmPasswordError }</p>
          </Group>

          <div>
            Already a user? <Link to={'/login'}>Login</Link>
          </div>

          <Button
          disabled={
              !firstName ||
              !lastName ||
              !email ||
              !password||
              !confirmPassword ||
              emailError ||
              passwordError || 
              confirmPasswordError
            }
            variant="primary"
            type="submit"
            onClick={ this.handleOnSubmit }
          >
            SIGN UP
          </Button>

        </Form>
      </div>
    );
  };
}

const mapState = ({ user, statusMessage }) => ({ user, statusMessage })

const mapDispatch = dispatch => { 
  return {
    createUser: form => dispatch(createUser(form)),
  }
}

export default connect(mapState, mapDispatch)(Signup);
