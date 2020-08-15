import React, { useState, useEffect } from "react";
import { watcherShoppingCartChanges } from "services/firebase/watcher";
import ShoppingCartProduct from "../../productShoppingCart/ShoppingCartProduct";
import { Button, Modal } from "react-bootstrap";
import "assets/styles/navbar/Navbar.css";
import { Link } from "react-router-dom";

export default function ShoppingCart({ user }) {
  
  const [shoppingCart, setShoppingCart] = useState([]);
  let totalToCancel = 0;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    watcherShoppingCartChanges(user.id, (shoppingCartUser) => {
      setShoppingCart(shoppingCartUser);
    });
  }, []);

  return shoppingCart === undefined ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <Button
        variant="warning"
        onClick={() => {
          handleShow();
        }}
        className="ShoppingCart-Button"
      >
        Shopping Cart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Shopping Cart
            <br />
            <small>{user.email}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shoppingCart.map((product) => {
            totalToCancel += product.price * product.amount;
            return (
              <ShoppingCartProduct
                product={product}
                totalToCancel={totalToCancel}
                key={product.id}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to='/Payment-Form' >
            <Button variant="primary" 
            onClick={handleClose}
            >
              Shop
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
