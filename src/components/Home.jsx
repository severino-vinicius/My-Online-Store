import React, { Component } from 'react';
import { getProductsByTerm, getProductsByCategory } from '../services/api';
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
    const { id } = event.target;
    const { inputValue } = this.state;

    this.setState({
      emptyResult: false, // Zera o state emptyResult para que a mensagem de nenhum produto encontrado não seja exibida quando o usuário limpar o input
    });

    if (id === 'input-research' || id === 'nav-search-button') { // Se o usuário clicar no botão ou pressionar enter, a pesquisa é feita
      if (event.key === 'Enter' || event.type === 'click') { // Verifica a fonte, input ou botão 'Buscar', para fazer a pesquisa
        const resultProducts = await getProductsByTerm(inputValue);
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
    } else if (id.startsWith('MLB')) { // Se o usuário clicar em uma categoria, a pesquisa é feita (É meio que uma gambiarra, a lógica que usei precisava usar o id. Como todo ID de categoria começa com MLB, funciona. Gostaria que me ajudassem a achar outra forma de fazer isso)
      const categoryProducts = await getProductsByCategory(id);

      this.setState({
        products: categoryProducts,
      });

      if (categoryProducts.length < 1) { // Se o array de produtos estiver vazio, o estado emptyResult é alterado para true e a mensagem de nenhum produto encontrado é exibida
        this.setState({
          emptyResult: true,
        });
      }

      this.setState({ // Limpa o input após a pesquisa
        inputValue: '',
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
            id="nav-search-button"
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
