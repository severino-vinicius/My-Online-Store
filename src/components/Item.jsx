import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Item extends Component {
  style = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  };

  render() {
    const { result } = this.props;
    const { title, thumbnail, price } = result;
    return (
      <div style={ this.style } data-testid="product">
        <h6>{title}</h6>
        <p>{ price }</p>
        <img src={ thumbnail } alt={ title } />
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
};

export default Item;
