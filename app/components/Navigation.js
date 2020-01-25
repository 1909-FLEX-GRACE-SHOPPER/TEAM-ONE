import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap'
import axios from 'axios';

class Navigation extends Component {
	state = {
		firstName: '',
		lastName: '',
		loggedIn: false
	};
	// componentDidMount(){
	//   axios.get('')
	// }
	render() {
		const { loggedIn } = this.state;
		return (
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand>Logo</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link href='/home'>Home</Nav.Link>
					<Nav.Link href='/about'>About</Nav.Link>
					<Nav.Link href='/products'>Shop</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href='/orders/:orderId/shoppingcart/:userId?'>
						Cart
					</Nav.Link>{' '}
					{/* this is just a temporary link that goes no-where for now, will update once the cart component is ready */}

				</Nav>
			</Navbar>
		);
	}
}

export default Navigation;
