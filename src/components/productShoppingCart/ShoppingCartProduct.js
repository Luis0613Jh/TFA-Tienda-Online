import React from "react";
import { Image } from "react-bootstrap";
import "assets/styles/navbar/Navbar.css";


export default function ShoppingCartProduct({ product, totalToCancel }) {
  const { img, brand, color, amount, price, size } = product;
  return (
    <div>
      <Image src={img} alt={brand} roundedCircle className ="Img-ShoppingCart"/>
      <p>
        <strong>Color:</strong> {color} <strong>Talla:</strong> {size}{" "}
        <strong>Cantidad:</strong> {amount} <strong>Precio:</strong> ${price}
      </p>
      <p>
        <strong>Total a cancelar:</strong> ${totalToCancel.toFixed(2)}
      </p>
    </div>
  );
}
