import React from "react";

import ProductItem from "../components/Products/ProductItem";
import { store } from "../store/products-store";
import "./Products.css";

const Products = (props) => {
  const state = store.getState();

  return (
    <ul className="products-list">
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
