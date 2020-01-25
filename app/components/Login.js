import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
  } from 'react-router-dom';
import { logInUser } from '../redux/thunks/UserThunks';


  
class Login extends Component {
	state = {
		email: '',
		password: '',
		loggedInStatus: false,
		logInError: false,
		firstName: '',
		lastName: ''
	};
	handleChange = event => {
		this.setState({
			logInError: false,
			[event.target.name]: event.target.value
		});
	};
	onSubmit = event => {
		event.preventDefault();
		// this.props.logInUser(this.state)
		axios
			.post(`/api/users/login`, this.state)
			.then((res) => {
				this.setState({
					loggedInStatus:true,
					firstName: res.data.firstName,
					lastName: res.data.lastName
				})
			}) 
			.catch(() => {
				this.setState({
					logInError: true
				});
			});
	};
	render() {
		const { email, password, loggedIn, logInError, firstName, lastName } = this.state;
		return (
		<Fragment> 
		{ !this.state.loggedInStatus ? (
			<Form>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Col sm='5'>
						<Form.Control
							name='email'
							type='email'
							placeholder='Enter email'
							onChange={this.handleChange}
						/>
					</Col>
				</Form.Group>
				<Form.Group>
					<Form.Label> Password</Form.Label>
					<Col sm='5'>
						<Form.Control
							name='password'
							type='password'
							placeholder='Password'
							onChange={this.handleChange}
						/>
					</Col>
				</Form.Group>
				<div> {logInError ? 'Invalid Credentials' : ''} </div>
				<Nav.Link href='/signup'> Sign up </Nav.Link>
				<Button onClick={this.onSubmit}> Log In! </Button>
			</Form>
		) : (
			<h2> {`Welcome to the Juul Store ${firstName} ${lastName}`} !</h2>
		)
		}
		</Fragment>
		);
	}
}
// const mapDispatchToProps = dispatch => {
// 	return {
// 		logInUser: data => dispatch(logInUser(data))
// 	};
// };
export default Login;
