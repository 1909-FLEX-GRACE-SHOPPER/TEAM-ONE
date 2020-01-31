import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const NavUser = ({user})=> {
    return(
        <Nav>
           <Nav.Link href='/user/:id'> {user.firstName} {user.lastName} </Nav.Link>
           <Button> Logout </Button>
        </Nav>
    )
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(NavUser)