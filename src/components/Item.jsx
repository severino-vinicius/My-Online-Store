import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  style = { // Estilização do componente
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  };

  addToCart = async () => {
    const { result, getCartSize } = this.props;
    await getCartSize();
    // console.log(result);
    const product = result;
    if (!localStorage.getItem('cartList')) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    const itemCount = cartList.filter((item) => item.id === result.id);
    if (itemCount.length === 0) {
      product.count = 1;
      cartList.push(product);
      localStorage.setItem('cartList', JSON.stringify(cartList));
    } else {
      const newCartList = cartList.map((item) => {
        if (item.id === result.id) {
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
    const { result } = this.props;
    const { title, thumbnail, price, id } = result;

    return (
      <div style={ this.style }>
        <Link to={ `/product-detail/${id}` } data-testid="product-detail-link">
          <div data-testid="product">

            <h6>{title}</h6>
            <p>{ price }</p>
            <img src={ thumbnail } alt={ title } />
          </div>
        </Link>
        <button
          onClick={ this.addToCart }
          data-testid="product-add-to-cart"
          type="button"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Item.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}.isRequired;

export default Item;
