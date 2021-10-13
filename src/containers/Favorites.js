import React from "react";

import FavoriteItem from "../components/Favorites/FavoriteItem";
import { store } from "../store/products-store";
import "./Products.css";

const Favorites = (props) => {
  const getState = store.getState();
  const favoriteProducts = getState.products.filter((p) => p.isFavorite);
  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map((prod) => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
