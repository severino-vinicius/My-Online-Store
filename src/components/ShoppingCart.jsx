import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/';

class ShoppingCart extends Component {
  state = {
    cartList: [],
    redirect: false,
    checkout: false,
    // totalPrice: 0,
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

  redirectToCheckout = () => {
    this.setState({
      checkout: true,
    });
  };

  getCartList = () => {
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    console.log(cartList);
    this.setState({
      cartList,
    });
  };

  verifyCartList = () => {
    if (!localStorage.getItem('cartList')) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
  };

  removeOneUnit = ({ target }) => {
    const { cartList } = this.state;
    const { id } = target;
    const newCartList = cartList.map((item) => {
      if (item.id === id) {
        if (item.count === 1) {
          return item;
        }
        const newItem = item;
        newItem.count -= 1;
        return newItem;
      }
      return item;
    }).filter((item) => item.count > 0);
    localStorage.setItem('cartList', JSON.stringify(newCartList));
    this.setState({
      cartList: newCartList,
    });
  };

  addOneUnit = ({ target }) => {
    const { cartList } = this.state;
    const { id } = target;
    const newCartList = cartList.map((item) => {
      if (item.id === id && item.count < item.available_quantity) {
        const newItem = item;
        newItem.count += 1;
        return newItem;
      }
      return item;
    });
    localStorage.setItem('cartList', JSON.stringify(newCartList));
    this.setState({
      cartList: newCartList,
    });
  };

  totalPrice = () => {
    const { cartList } = this.state;
    const totalPrice = cartList.reduce((acc, item) => acc + (item.count * item.price), 0);
    return totalPrice;
  };

  removeFromCart = ({ target }) => {
    const { cartList } = this.state;
    const { id } = target;
    const newCartList = cartList.map((item) => {
      if (item.id === id) {
        const newItem = item;
        newItem.count = 0;
        return newItem;
      }
      return item;
    }).filter((item) => item.count > 0);
    localStorage.setItem('cartList', JSON.stringify(newCartList));
    this.setState({
      cartList: newCartList,
    });
  };

  render() {
    const { cartList, redirect, checkout } = this.state;
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
        <button
          onClick={ this.redirectToCheckout }
          data-testid="checkout-products"
        >
          Finalizar Compra
        </button>
        <br />
        Preço Total: R$:
        {' '}
        { this.totalPrice() }
        { checkout && <Redirect to="/checkout" />}
        {
          cartList.length > 0
            ? (cartList.map((item) => (
              <div style={ this.style } key={ item.id }>
                <p data-testid="shopping-cart-product-name">{ item.title }</p>
                <p data-testid="shopping-cart-product-price">{ item.price }</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <p data-testid="shopping-cart-product-quantity">{ item.count }</p>
                {item.shipping.free_shipping
                  ? <p data-testid="free-shipping">Frete Grátis</p> : null}
                <button
                  id={ item.id }
                  onClick={ this.removeOneUnit }
                  data-testid="product-decrease-quantity"
                >
                  {' '}
                  -
                  {' '}

                </button>
                <button
                  id={ item.id }
                  onClick={ this.addOneUnit }
                  data-testid="product-increase-quantity"
                >
                  {' '}
                  +
                  {' '}

                </button>
                <button
                  id={ item.id }
                  onClick={ this.removeFromCart }
                  data-testid="remove-product"
                >
                  {' '}
                  X
                  {' '}

                </button>
              </div>
            )))
            : <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>

        }
      </div>
    );
  }
}

export default ShoppingCart;
