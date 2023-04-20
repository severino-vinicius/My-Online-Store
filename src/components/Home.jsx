import React, { Component } from 'react';
import { getProductsByTerm } from '../services/api';
import ShoppingCartButton from './ShoppingCartButton';
import Aside from './Aside';
import Item from './Item';

class Home extends Component {
  state = {
    products: [],
    emptyResult: false, // State para exibir mensagem de nenhum produto encontrado/
    inputValue: '', // State para limpar o input após a pesquisa e fazer a lógica de exibição da mensagem inicial
  };

  handleResearch = async (event) => {
    const { value } = event.target;
    this.setState({
      emptyResult: false, // Zera o state emptyResult para que a mensagem de nenhum produto encontrado não seja exibida quando o usuário limpar o input
    });
    if (event.key === 'Enter' || event.type === 'click') { // Se o usuário clicar no botão ou pressionar enter, a pesquisa é feita
      const resultProducts = await getProductsByTerm(value);
      this.setState({
        products: resultProducts,
      });
      console.log(resultProducts);
      if (resultProducts.length < 1) {
        this.setState({
          emptyResult: true,
        });
      }
      this.setState({
        inputValue: '',
      });
    }
  };

  // Essa função associa o valor do input ao state inputValue para que o input seja limpo após a pesquisa e que a mensagem inicial seja exibida novamente
  handleInputValue = ({ target }) => {
    this.setState({
      inputValue: target.value,
    }, () => {
    });
  };

  render() {
    const { products, emptyResult, inputValue } = this.state;
    return (
      <>
        <Aside />
        <header>
          <input
            data-testid="query-input"
            type="text"
            name="research"
            id=""
            value={ inputValue }
            onChange={ this.handleInputValue }
            onKeyDown={ this.handleResearch }
          />
          <button
            data-testid="query-button"
            onClick={ this.handleResearch }
          >
            Buscar

          </button>
          <ShoppingCartButton />
        </header>
        <main>
          <ul>
            {products.map((product) => (
              <Item key={ product.id } result={ product } />))}
          </ul>

          { !emptyResult && inputValue.length === 0
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}

          { emptyResult && <p>Nenhum produto foi encontrado</p> }

        </main>
      </>
    );
  }
}

export default Home;
