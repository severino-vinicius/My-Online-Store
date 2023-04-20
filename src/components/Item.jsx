import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  style = { // Estilização do componente
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
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
        <button type="button">Adicionar ao carrinho</button>
      </div>

    );
  }
}

Item.propTypes = {
  result: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}.isRequired;

export default Item;
