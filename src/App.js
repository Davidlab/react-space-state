import React from "react";
import { Route, useLocation } from "react-router-dom";

import Navigation from "./components/Nav/Navigation";
import ProductsPage from "./containers/Products";
import FavoritesPage from "./containers/Favorites";
import CountPage from "./containers/Count";
import Counter from "./containers/Counter";
import CounterSubscribe from "./containers/CounterSubscribe";

const App = (props) => {
  const location = useLocation();
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Route path="/" component={ProductsPage} exact />
        <Route path="/favorites" component={FavoritesPage} />
        <Route path="/count" component={CountPage} />
        {location.pathname !== "/count" && <Counter />}
        <CounterSubscribe />
      </main>
    </React.Fragment>
  );
};

export default App;
