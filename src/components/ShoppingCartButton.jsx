import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class ShoppingCartButton extends Component {
  state = {
    redirect: false,
    // cartSize: 0,
  };

  // componentDidMount() {
  //   this.getCartSize();
  // }

  // verifyCartList = () => {
  //   if (!localStorage.getItem('cartList')) {
  //     localStorage.setItem('cartList', JSON.stringify([]));
  //   }
  //   if (!localStorage.getItem('cartSize')) {
  //     localStorage.setItem('cartSize', JSON.stringify(0));
  //   }
  // };

  // getCartSize = () => {
  //   this.verifyCartList();
  //   const cartList = JSON.parse(localStorage.getItem('cartList'));
  //   const cartSize = cartList.reduce((acc, item) => acc + item.count, 0);
  //   localStorage.setItem('cartSize', JSON.stringify(cartSize));
  //   const cartSizeLocalS = JSON.parse(localStorage.getItem('cartSize'));
  //   this.setState({
  //     cartSize: cartSizeLocalS,
  //   });
  // };

  redirectToCart = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { redirect } = this.state;
    const { cartSize } = this.props;
    return (
      <div>
        <button
          data-testid="shopping-cart-button"
          onClick={ this.redirectToCart }
        >
          Ir pro Carrinho
        </button>
        <p data-testid="shopping-cart-size">
          Nº de itens no carrinho:
          {' '}
          { cartSize }
        </p>
        { redirect
         && <Redirect to="/shopping-cart" />}
      </div>
    );
  }
}

ShoppingCartButton.propTypes = {
  cartSize: PropTypes.number.isRequired,
};

export default ShoppingCartButton;
