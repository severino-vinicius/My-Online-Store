import React, { Component } from 'react';
import { getCategories } from '../services/api';
import ShoppingCartButton from './ShoppingCartButton';
import Aside from './Aside';

class Home extends Component {
  state = {
    products: [],
  };

  handleResearch = ({ target }) => {
    const { value } = target;
    const resultProducts = getCategories(value);
    this.setState({
      products: resultProducts,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <>
        <div>home</div>
        <Aside />
        <input
          type="text"
          name="research"
          id=""
          onChange={ this.handleResearch }
        />
        { products.length < 1
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        <ShoppingCartButton />
      </>
    );
  }
}

export default Home;
