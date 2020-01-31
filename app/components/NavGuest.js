import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

const NavGuest = ()=> {
    return(
        <Nav>
			<Nav.Link to='/signup' href='/signup'> Sign Up </Nav.Link>
			<Nav.Link to='/login' href='/login'> Login </Nav.Link>
		</Nav>
    )
}

export default NavGuest; 