import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/';

class ShoppingCart extends Component {
  state = {
    cartList: [],
    redirect: false,
  };

  redirectToHome = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { cartList, redirect } = this.state;
    return (
      <div>
        <button
          data-testid=""
          onClick={ this.redirectToHome }
        >
          Voltar para a Home
        </button>
        { redirect
         && <Redirect to="/" />}
        {
          cartList.length > 0
            ? false
            : <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>

        }
      </div>
    );
  }
}

export default ShoppingCart;
