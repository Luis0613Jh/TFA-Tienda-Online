import React from "react";
import { loginUser } from 'services/firebase/api'
import { Form, Button } from "react-bootstrap";

export default function Login({handleClose}) {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control id="emailLogin" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control id="passwordLogin" type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" onClick={() => {loginUser(); handleClose()}} size="lg" block>
          Login 
        </Button>
      </Form>
    </div>
  );
}
