import React, { useContext } from "react";
import "assets/styles/navbar/Navbar.css";
import { Button, Navbar, Image } from "react-bootstrap";
import { AuthContext } from "context/AuthContext";
import ModalContainer from "components/modals/login/ModalContainer";
import ShoppingCart from "components/modals/shoppingCart/ShoppingCart";
import { logoutUser } from "services/firebase/api";

import Logo from "assets/images/estelar.jpg";

export default function NavbarHeader() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div className="Navbar-Container">
      <Navbar bg="dark" variant="dark" className="Navbar" >
        <Navbar.Brand className="Nav" href="/">
          <Image src={Logo} alt="Logo" className="Img-Home" fluid />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <ShoppingCart user={user} />
          ) : (
            <Button variant="warning" disabled className="ShoppingCart-Button">
              Shopping Cart
            </Button>
          )}
          {user ? (
            <Navbar.Text className ="Navbar-Text"><strong>Sesión iniciada como:</strong> {user.email}</Navbar.Text>
          ) : (
            <Navbar.Text className ="Navbar-Text">No se ha encontrado ninguna sesión activa</Navbar.Text>
          )}
          {user ? (
            <Button
              variant="danger"
              onClick={logoutUser}
              className="Logout-Login-Button"
            >
              Logout
            </Button>
          ) : (
            <ModalContainer />
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
