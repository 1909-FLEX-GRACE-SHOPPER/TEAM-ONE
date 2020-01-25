import React from 'react'; 
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap'

const SignedOutLinks = () => {
    return (
        <Nav> 
            <NavLink to='/signup'> Sign Up </NavLink>
            <NavLink to='/login'> Login </NavLink>
        </Nav>
    )
}

export default SignedOutLinks; 