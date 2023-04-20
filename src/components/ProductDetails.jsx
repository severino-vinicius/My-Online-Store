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

  render() {
    const { productDetails } = this.state;
    console.log(productDetails);
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
