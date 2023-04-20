import React, { Component } from 'react';

class AddToCartButton extends Component {
  render() {
    return (
      <button onClick={ this.addToCart }>
        Adicionar ao carrinho
      </button>
    );
  }
}

export default AddToCartButton;
