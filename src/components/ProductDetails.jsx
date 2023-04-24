import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ShoppingCartButton from './ShoppingCartButton';

class ProductDetails extends Component {
  state = {
    productDetails: [],
    evaluations: [],
    errorMsg: false,
    evaluation: {
      email: '',
      text: '',
      rating: '',
    },
    cartSize: 0,
  };

  componentDidMount() {
    const { evaluations } = this.state;
    if (evaluations.length === 0) {
      this.restoreEvaluations();
    }
    this.handleId();
    this.getCartSize();
  }

  verifyCartList = () => {
    if (!localStorage.getItem('cartList')) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
    if (!localStorage.getItem('cartSize')) {
      localStorage.setItem('cartSize', JSON.stringify(0));
    }
  };

  getCartSize = (callback) => {
    this.verifyCartList();
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    const cartSize = cartList.reduce((acc, item) => acc + item.count, 0);
    // localStorage.setItem('cartSize', JSON.stringify(cartSize));
    // const cartSizeLocalS = JSON.parse(localStorage.getItem('cartSize'));
    this.setState({
      cartSize,
    }, callback);
  };

  handleId = async () => {
    const { match: { params: { id } } } = this.props;
    const resultProductDetails = await getProductById(id);
    this.setState({
      productDetails: resultProductDetails,
    });
  };

  addToCart = () => {
    const { productDetails } = this.state;
    this.getCartSize();
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

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState((prevState) => ({
      errorMsg: false, // Sempre que algo for modificado significa que o erro não existe mais, caso contrário errorMsg seria true, então sempre que algo for modificado, o erro é resetado
      evaluation: {
        ...prevState.evaluation,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { evaluation: { email, rating } } = this.state;
    if (!(email.includes('@')) || !rating) { // Verifica se o email é válido e se o rating foi selecionado
      this.setState({
        errorMsg: true, // Se o email não for válido ou o rating não for selecionado, errorMsg é true
      });
    } else { // Senão continua com o processo de adicionar a avaliação
      const { evaluation } = this.state;
      if (!localStorage.getItem(`${id}`)) {
        localStorage.setItem(`${id}`, JSON.stringify([])); // Se não existir o localStorage com o id do produto, cria um
      }
      const evaluations = JSON.parse(localStorage.getItem(`${id}`));
      evaluations.push(evaluation);
      localStorage.setItem(`${id}`, JSON.stringify(evaluations));
      this.setState({ // Reseta o errorMsg caso ele ainda exista (Meio que impossível mas vai saber né)
        errorMsg: false,
        evaluations, // Adiciona a avaliação ao estado para a renderização ser feita
      }, () => {
        this.setState({ // Reseta o estado evaluation para que o formulário fique vazio
          evaluation: {
            email: '',
            text: '',
            rating: '',
          },
        });
      });
    }
  };

  restoreEvaluations = () => { // Função que restaura as avaliações do localStorage
    const { match: { params: { id } } } = this.props;
    if (!localStorage.getItem(`${id}`)) {
      localStorage.setItem(`${id}`, JSON.stringify([]));
    }
    const evaluations = JSON.parse(localStorage.getItem(`${id}`));
    this.setState({
      evaluations,
    });
  };

  render() {
    const { productDetails, evaluations, cartSize,
      errorMsg, evaluation: { email, text } } = this.state;
    return (
      <div>
        <h1>ProductDetails</h1>
        <ShoppingCartButton cartSize={ cartSize } />
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
        <button onClick={ this.addToCart } data-testid="product-detail-add-to-cart">
          Adicionar ao carrinho
        </button>
        <h2>Avaliação do produto</h2>
        <form>
          <label>
            Email:
            <input
              data-testid="product-detail-email"
              onChange={ this.handleChange }
              value={ email } // O value do input é o estado evaluation.email, senão o input não seria controlado
              type="email"
              name="email"
            />
          </label>
          <label>
            Avaliação:
            <input
              onChange={ this.handleChange }
              data-testid="1-rating"
              type="radio"
              value="1"
              name="rating"
            />
            <input
              onChange={ this.handleChange }
              data-testid="2-rating"
              type="radio"
              value="2"
              name="rating"
            />
            <input
              onChange={ this.handleChange }
              data-testid="3-rating"
              type="radio"
              value="3"
              name="rating"
            />
            <input
              onChange={ this.handleChange }
              data-testid="4-rating"
              type="radio"
              value="4"
              name="rating"
            />
            <input
              onChange={ this.handleChange }
              data-testid="5-rating"
              type="radio"
              value="5"
              name="rating"
            />
          </label>
          rating
          <label>
            Comentário(Opcional):
            <textarea
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
              value={ text } // O value do input é o estado evaluation.text, senão o input não seria controlado
              type="text"
              name="text"
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="submit"
            onClick={ this.handleSubmit }
          >
            Enviar
          </button>
          {errorMsg && <p data-testid="error-msg">Campos inválidos</p>}
        </form>
        {evaluations.length === 0
          ? <p>Não há avaliações</p> : evaluations.map((evaluation, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{evaluation.email}</p>
              <p data-testid="review-card-rating">{evaluation.rating}</p>
              <p data-testid="review-card-evaluation">{evaluation.text}</p>
            </div>
          ))}
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
