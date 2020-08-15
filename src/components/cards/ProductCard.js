import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DB_Firestore } from "services/firebase/setup";
import "assets/styles/layouts/Admin.css";

export default function ProductCard({ product }) {
  const [select, setSelect] = useState(false);
  const { preview, description, price, id } = product;
  function setProductSelected() {
    const productRef = DB_Firestore.collection("products").doc(`${id}`);
    productRef.update({
      selected: true,
    });
  }
  return (
    <Card style={{ width: "18rem" }} className="Product-Card">
      <Card.Img variant="top" src={preview} />
      <Card.Body className="Product-Card-Body">
        <Card.Title>{description}</Card.Title>
        <Card.Text className="Price-Text">{`$${price}`}</Card.Text>
        <Button
          variant="primary"
          className="Buy-Button"
          onClick={() => {
            setProductSelected();
            setSelect(true);
          }}
        >
          Select
        </Button>
        {select ? (
          <Link to="/Product">
            <Button variant="primary" className="Buy-Button">
              Buy now
            </Button>
          </Link>
        ) : (
          <Button variant="primary" disabled>Buy now</Button>
        )}
      </Card.Body>
    </Card>
  );
}
