import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartList: [],
  };

  render() {
    const { cartList } = this.state;
    return (
      <div>
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
