import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { logInUser } from '../redux/thunks/UserThunks';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
		isLoading: false
	};
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	onSubmit = (e) => {
		e.preventDefault()
		this.props.logInUser(this.state);
	};
	render() {
		const { email, password, errors, isLoading } = this.state;
		return (
			<Form>
				<Form.Group controlId='formGroupEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='formGroupPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Button onClick={this.onSubmit}> Log In! </Button>
			</Form>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logInUser: data => dispatch(logInUser(data))
	};
};

export default connect(null, mapDispatchToProps)(Login);
