import React from "react";
import { registerUser } from 'services/firebase/api';
import { Form, Button } from "react-bootstrap";

export default function Register() {
  
  return (
    <div>
      <Form onSubmit={registerUser}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control id="emailRegister" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control id="passwordRegister" type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" size="lg" block>
          Register
        </Button>
      </Form>
    </div>
  );
}
