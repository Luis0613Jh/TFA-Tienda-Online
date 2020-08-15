import React from "react";
import ReactDOM from "react-dom";
import "assets/styles/layouts/Index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin";
import PaymentForm from "views/PaymentForm";
import ProductView from "views/ProductView";
import { ProductProvider } from "context/ProductContext";
import { ProductsProvider } from "context/ProductsContext";
import { AuthContextProvider } from "context/AuthContext";
import { BrandsProvider } from "context/BrandsContext";

const root = (
  <BrowserRouter>
    <AuthContextProvider>
      <ProductsProvider>
        <BrandsProvider>
          <ProductProvider>
            <Switch>
              <Route path="/Estelar-Shop" component={Admin} />
              <Route path="/Payment-Form" component={PaymentForm} />
              <Route path="/Product" component={ProductView} />
              <Redirect from="/" to="/Estelar-Shop" />
            </Switch>
          </ProductProvider>
        </BrandsProvider>
      </ProductsProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
ReactDOM.render(root, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
