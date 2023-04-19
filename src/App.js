import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
      </Switch>
    </div>
  );
}

export default App;
