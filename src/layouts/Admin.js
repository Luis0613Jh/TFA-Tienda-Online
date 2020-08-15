import React from "react";
import "assets/styles/layouts/Admin.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from 'components/navbar/NavbarHeader';
import CarouselOfBrands from "components/carousel/CarouselOfBrands";
import ListOfProducts from "components/products/ListOfProducts";


function Admin() {
  
  return (
    <div className="Shop-Estelar">
        <header className="Estelar-Header">
          <Navbar />
        </header>

      <div className="Estelar-Body">
        <h2 className="Marcas-Destacadas">Marcas destacadas</h2>
        <div>
          <CarouselOfBrands />
        </div>
        <div>
          <ListOfProducts />
        </div>
      </div>

        <footer className="Estelar-Footer">
          <p className="Footer-Text">© 2020 Estelar Shop Online </p>
        </footer>
    </div>
  );
}

export default Admin;
