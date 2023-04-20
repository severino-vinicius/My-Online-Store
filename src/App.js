import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
// import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
        {/* <Route path="/product-detail/:id" component={ ProductDetail } /> */}
      </Switch>
    </div>
  );
}

export default App;
