import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/';

class ShoppingCart extends Component {
  state = {
    cartList: [],
    redirect: false,
  };

  style = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  };

  componentDidMount() {
    this.getCartList();
  }

  redirectToHome = () => {
    this.setState({
      redirect: true,
    });
  };

  getCartList = () => {
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    this.setState({
      cartList,
    });
  };

  verifyCartList = () => {
    if (!localStorage.getItem('cartList')) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
  };

  render() {
    const { cartList, redirect } = this.state;
    return (
      <div>
        { this.verifyCartList() }
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
            ? (cartList.map((item) => (
              <div style={ this.style } key={ item.id }>
                <p data-testid="shopping-cart-product-name">{ item.title }</p>
                <p data-testid="shopping-cart-product-quantity">{ item.count }</p>
                <p data-testid="shopping-cart-product-price">{ item.price }</p>
                <img src={ item.thumbnail } alt={ item.title } />
              </div>
            )))
            : <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>

        }
      </div>
    );
  }
}

export default ShoppingCart;
