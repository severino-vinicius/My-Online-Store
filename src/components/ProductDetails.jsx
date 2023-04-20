import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ShoppingCartButton from './ShoppingCartButton';

class ProductDetails extends Component {
  state = {
    productDetails: [],
  };

  componentDidMount() {
    this.hadleId();
  }

  hadleId = async () => {
    const { match: { params: { id } } } = this.props;
    const resultProductDetails = await getProductById(id);
    this.setState({
      productDetails: resultProductDetails,
    });
  };

  addToCart = () => {
    const { productDetails } = this.state;
    const product = productDetails;
    if (!localStorage.getItem('cartList')) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    const itemCount = cartList.filter((item) => item.id === productDetails.id);
    if (itemCount.length === 0) {
      product.count = 1;
      cartList.push(product);
      localStorage.setItem('cartList', JSON.stringify(cartList));
    } else {
      const newCartList = cartList.map((item) => {
        if (item.id === productDetails.id) {
          const newItem = item;
          newItem.count += 1;
          return newItem;
        }
        return item;
      });
      localStorage.setItem('cartList', JSON.stringify(newCartList));
    }
  };

  render() {
    const { productDetails } = this.state;
    return (
      <div>
        <h1>ProductDetails</h1>
        <img
          src={ productDetails.thumbnail }
          alt="productDetails.title"
          data-testid="product-detail-image"
        />
        <h2 data-testid="product-detail-name">
          { productDetails.title }
        </h2>
        <p data-testid="product-detail-price">
          { productDetails.price }
        </p>
        <button
          onClick={ this.addToCart }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <ShoppingCartButton />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
