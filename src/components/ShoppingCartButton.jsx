import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class ShoppingCartButton extends Component {
  state = {
    redirect: false,
  };

  redirectToCart = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { redirect } = this.state;
    return (
      <div>
        <button
          data-testid="shopping-cart-button"
          onClick={ this.redirectToCart }
        >
          Carrinho
        </button>
        { redirect
         && <Redirect to="/shopping-cart" />}
      </div>
    );
  }
}

export default ShoppingCartButton;
