import React, { useState, useEffect, useContext } from "react";
import Cards from "react-credit-cards";
import { AuthContext } from "context/AuthContext";
import { watcherShoppingCartChanges } from "services/firebase/watcher";
import "assets/styles/paymentForm/PaymentForm.css";
import "react-credit-cards/es/styles-compiled.css";

import {
  deleteShoppingCart,
  deleteShoppingCartDoc,
} from "services/firebase/api";

import { Link } from "react-router-dom";

const PaymentForm = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    watcherShoppingCartChanges(user.id, (shoppingCartUser) => {
      setShoppingCart(shoppingCartUser);
    });
  }, []);

  console.log(shoppingCart);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (e) => {
    setCard({
      ...card,
      focus: e.target.name,
    });
  };

  function handleShoppingCart(idUser, shoppingCart) {
    shoppingCart.map((product) => {
      const { id } = product;
      deleteShoppingCart(idUser, id);
      deleteShoppingCartDoc(idUser, id);
    });
  }
  function successfulPayment () {
    alert('Compra realizada con éxito. Se ha vaciado su carrito de compras');
  }

  return (
    <div className="Card">
      <div className="Card-Body">
        <Cards
          number={card.number}
          name={card.name}
          expiry={card.expiry}
          cvc={card.cvc}
          focused={card.focus}
        />
        <form>
          <div className="form-group">
            <label htmlFor="number">Número de la tarjeta</label>
            <input
              type="text"
              name="number"
              id="number"
              maxLength="16"
              className="form-control"
              placeholder="XXXX XXXX XXXX XXXX"
              onChange={handleInputChange}
              onFocus={handleFocusChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength="30"
              className="form-control"
              placeholder="XXXX XXXX"
              onChange={handleInputChange}
              onFocus={handleFocusChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="expiry">Fecha de expiración</label>
              <input
                type="text"
                name="expiry"
                id="expiry"
                maxLength="4"
                className="form-control"
                placeholder="XXXX"
                onChange={handleInputChange}
                onFocus={handleFocusChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                maxLength="4"
                className="form-control"
                placeholder="XXXX"
                onChange={handleInputChange}
                onFocus={handleFocusChange}
              />
            </div>
          </div>
          <Link to="/Estelar-Shop">
            <button
              onClick={() => {
                handleShoppingCart(user.id, shoppingCart);
                successfulPayment();
              }}
              type="button"
              className="btn btn-success btn-block btn-lg"
            >
              Pagar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
