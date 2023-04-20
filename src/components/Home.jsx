import React, { Component } from 'react';
import { getProductsByTerm } from '../services/api';
import ShoppingCartButton from './ShoppingCartButton';
import Aside from './Aside';
import Item from './Item';

class Home extends Component {
  state = {
    products: [],
    emptyResult: false, // Estado para exibir mensagem de nenhum produto encontrado/
    inputValue: '', // Estado para limpar o input após a pesquisa e fazer a lógica de exibição da mensagem inicial
  };

  handleQuery = async (event) => {
    const { value, id } = event.target;
    this.setState({
      emptyResult: false, // Zera o estado emptyResult para que a mensagem de nenhum produto encontrado não seja exibida quando o usuário limpar o input
    });
    if (id === 'input-research') { // Verifica a fonte do evento
      if (event.key === 'Enter' || event.type === 'click') { // Se o usuário clicar no botão ou pressionar enter, a pesquisa é feita
        const resultProducts = await getProductsByTerm(value);
        this.setState({
          products: resultProducts,
        });
        if (resultProducts.length < 1) { // Se o array de produtos estiver vazio, o estado emptyResult é alterado para true e a mensagem de nenhum produto encontrado é exibida
          this.setState({
            emptyResult: true,
          });
        }
        this.setState({ // Limpa o input após a pesquisa
          inputValue: '',
        });
      }
    } else if (id === 'category-button') { // Se o usuário clicar em uma categoria, a pesquisa é feita
      const resultCategoryProducts = await getProductsByTerm(value);
      this.setState({
        products: resultCategoryProducts,
      });
    }
  };

  handleInputValue = ({ target }) => { // Essa função associa o valor do input ao estado inputValue para que o input seja limpo após a pesquisa e que a mensagem inicial seja exibida novamente
    this.setState({
      inputValue: target.value,
    }, () => {
    });
  };

  render() {
    const { products, emptyResult, inputValue } = this.state;
    return (
      <>
        <header>
          <input
            data-testid="query-input"
            type="text"
            name="research"
            id="input-research"
            value={ inputValue }
            onChange={ this.handleInputValue }
            onKeyDown={ this.handleQuery }
          />
          <button
            data-testid="query-button"
            onClick={ this.handleQuery }
          >
            Buscar

          </button>
          <ShoppingCartButton />
        </header>
        <Aside handleQuery={ this.handleQuery } />
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
