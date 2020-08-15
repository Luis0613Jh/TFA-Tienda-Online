import React, {useContext } from "react";
import { BrandsContext } from "context/BrandsContext";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";

export default function CarouselOfBrands() {
  const brandsContext = useContext(BrandsContext);
  const { brands } = brandsContext;
    return brands === undefined ? <Spinner animation="border" variant="secondary" />
    : 
    <div className="Carousel-Container">
      <Carousel className="Carousel">
        <Carousel.Item key={brands[0].id} className="Carousel-Item">
          <a href={brands[0].url}>
            <img className="Img-Brand" src={brands[0].imgURL} alt={brands[0].name} />
          </a>
        </Carousel.Item>
        <Carousel.Item key={brands[1].id}>
          <a href={brands[1].url}>
            <img className="Img-Brand" src={brands[1].imgURL} alt={brands[1].name} />
          </a>
        </Carousel.Item>
      </Carousel>
    </div>
}
