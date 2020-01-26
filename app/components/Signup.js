import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="container mt-4">
      <div className="logo-medium"></div>
      <Form className="signup-form">
        <Form.Group>
          <Form.Label>FIRST NAME</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>LAST NAME</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>USER NAME</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>PASSWORD</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>CONFIRM PASSWORD</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <div>
          Already a user? <Link to={'/login'}>Login</Link>
        </div>
        <Button variant="primary" type="submit">
          SIGN UP
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
