import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

export default function ModalContainer() {
  const [modalSelected, setModalSelected] = useState("Login");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="danger" onClick={handleShow} className="Logout-Login-Button">
        Login
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalSelected}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="outline-dark"
            onClick={() => setModalSelected("Login")}
          >
            Login
          </Button>{" "}
          <Button
            variant="outline-dark"
            onClick={() => setModalSelected("Register")}
          >
            Register
          </Button>
          {modalSelected === "Login" ? (
            <Login handleClose={handleClose} />
          ) : (
            <Register />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
