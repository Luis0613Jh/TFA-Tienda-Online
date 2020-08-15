import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "context/ProductContext";
import { AuthContext } from "context/AuthContext";
import { DB_Firestore } from "services/firebase/setup";
import { userAddToCart } from "services/firebase/api";
import { watcherProductColors } from "services/firebase/watcher";
import { Button, Spinner } from "react-bootstrap";
import "assets/styles/layouts/Admin.css";

export default function ProductView() {
  const [amount, setAmount] = useState(1);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const productContext = useContext(ProductContext);
  const { product = {} } = productContext;
  const {
    brand,
    category,
    description,
    price,
    sizes,
    id,
    preview,
    stock,
  } = product;

  const [productToAdd, setProductToAdd] = useState({
    description: null,
    img: null,
    price: null,
    id: null,
    color: null,
    size: null,
    stock: null,
    category: null,
    amount: null,
  });

  const [colors, setColors] = useState([]);
  function handleProduct(img, color, size) {
    setProductToAdd({
      description,
      img,
      price,
      id,
      color,
      size,
      stock,
      category,
      amount,
    });
  }

  function handleAddToCart() {
    return user !== null
      ? userAddToCart(productToAdd, user.id)
      : alert(
          "No puede agregar un producto al carrito de compras sin antes haber iniciado sesión"
        );
  }

  function setProductSelected() {
    const productRef = DB_Firestore.collection("products").doc(`${id}`);
    productRef.update({
      selected: false,
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      watcherProductColors(id, (colors) => {
        setColors(colors);
        handleProduct(preview, colors[0].id, sizes[0], amount);
      });
    }

    return () => {
      setProductSelected({ id });
    };
  }, []);

  useEffect(() => {
    handleProduct(productToAdd.img, productToAdd.color, productToAdd.size);

    return () => {
      setProductSelected({ id });
    };
  }, [amount]);
  
  return product === undefined ? (
    <Spinner animation="border" variant="secondary" />
  ) : (
    <div className="Product-View">
      <div className="Product-Container">
        <img
          src={productToAdd.img}
          alt={productToAdd.id}
          className="Img-Product"
        />
        <p className="Brand"> {brand}</p>
        <p className="Description"> {description}</p>
        <p className="Price"> ${price}</p>

        <ul className="List-Color">
          {colors.map((color) => {
            return (
              <li className="Color" key={color.id}>
                <img src={color.img_50x50} alt={`${id} - ${color.id}`} />
                <Button
                  variant="outline-dark"
                  className="View-Color-Button"
                  onClick={() =>
                    handleProduct(
                      color.img_614x614,
                      color.id,
                      productToAdd.size,
                      amount
                    )
                  }
                >
                  View
                </Button>
              </li>
            );
          })}
        </ul>

        <ul className="List-Sizes">
          {sizes.map((size) => {
            return (
              <li className="Size" key={size}>
                <Button
                  variant="light"
                  onClick={() =>
                    handleProduct(
                      productToAdd.img,
                      productToAdd.color,
                      size,
                      amount
                    )
                  }
                >
                  {size}
                </Button>
              </li>
            );
          })}
        </ul>
        <div className="Buttons-Amount-Container">
          <Button
            variant="outline-light"
            className="Button-Amount"
            onClick={() => {
              setAmount(amount > 1 ? amount - 1 : 1);
            }}
          >
            Disminuir
          </Button>
          <p className="Amount-text">{amount}</p>
          <Button
            variant="outline-light"
            className="Button-Amount"
            onClick={() => {
              setAmount(amount >= 1 && amount <= 100 ? amount + 1 : 100);
            }}
          >
            Aumentar
          </Button>
        </div>
        <div className="Add-Shopping-Container">
          <Button
            variant="secondary"
            className="Add-Shoppin-Cart-Button"
            onClick={() => {
              handleAddToCart();
              alert('Se ha agregado el producto exitosamente')
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
