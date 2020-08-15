import React, { useContext } from "react";
import { ProductsContext } from "context/ProductsContext";
import ProductCard from "components/cards/ProductCard";
import "assets/styles/layouts/Admin.css";
import { Spinner } from "react-bootstrap";

export default function CarouselOfBrands() {
  const productsContext = useContext(ProductsContext);
  const { products } = productsContext;
  return products === undefined ? (
    <Spinner animation="border" variant="secondary" />
  ) : (
    <div className="List-Products-Container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
