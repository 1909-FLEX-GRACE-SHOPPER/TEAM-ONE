import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap";

const Login = () => {
  return (
    <div className="login-page">
      <Link>BACK</Link>
      <div className="logo-medium"></div>
      <Form>
        <Form.Group>
          <Form.Label>USER NAME OR EMAIL</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>PASSWORD</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <div>SIGN IN WITH GOOGLE</div>
        <div>SIGN IN WITH FACEBOOK</div>
        <div>
          NOT A USER? <Link>SIGN UP</Link>
        </div>
        <Button variant="primary" type="submit">
          LOG IN
        </Button>
      </Form>
    </div>
  );
};
