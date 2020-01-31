import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import NavGuest from './NavGuest';
import NavUser from './NavUser';

class Navigation extends Component {
	render() {
		const { user } = this.props;
		const links = user.firstName ? <NavUser/> : <NavGuest />;
		return (
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand>Logo</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link href='/home'>Home</Nav.Link>
					<Nav.Link href='/about'>About</Nav.Link>
					<Nav.Link href='/products'>Shop</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href='/shoppingcart/:userId'>Cart</Nav.Link>
					{/* this is just a temporary link that goes no-where for now, will update once the cart component is ready */}
					{links}
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

export default connect(mapStateToProps)(Navigation);
