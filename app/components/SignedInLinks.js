import React from 'react'; 
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap'

const SignedInLinks = () => {
    return (
        <Nav> 
            <NavLink to='/logout'> Log Out </NavLink>
        </Nav>
    )
}

export default SignedInLinks; 