import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/';

class Checkout extends Component {
  state = {
    cartList: [],
    invalidFields: false,
    redirect: false,
    form: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
    },
  };

  style = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  };

  componentDidMount() {
    this.getCartList();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      invalidFields: false,
    }, () => {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          [name]: value,
        },
      }));
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { form: { name, email, cpf, phone, cep, address, payment } } = this.state;

    if (!(email.includes('@'))
     || name === ''
     || cpf === ''
     || phone === ''
     || cep === ''
     || address === ''
     || !payment) {
      this.setState({
        invalidFields: true,
      });
    } else {
      localStorage.setItem('cartList', JSON.stringify([]));
      this.setState({
        invalidFields: false,
        redirect: true,
      });
    }
  };

  getCartList = () => {
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    this.setState({
      cartList,
    });
  };

  totalPrice = () => {
    const { cartList } = this.state;
    const totalPrice = cartList.reduce((acc, item) => acc + (item.count * item.price), 0);
    return totalPrice;
  };

  render() {
    const { cartList, invalidFields, redirect,
      form: { name, email, cpf, phone, cep, address } } = this.state;

    return (
      <div style={ this.style }>
        <form>
          <label>
            Nome Completo:
            <input
              type="text"
              name="name"
              onChange={ this.handleChange }
              value={ name }
              data-testid="checkout-fullname"
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="checkout-email"
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              name="cpf"
              onChange={ this.handleChange }
              value={ cpf }
              data-testid="checkout-cpf"
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              name="phone"
              onChange={ this.handleChange }
              value={ phone }
              data-testid="checkout-phone"
            />
          </label>
          <label>
            CEP:
            <input
              type="text"
              name="cep"
              onChange={ this.handleChange }
              value={ cep }
              data-testid="checkout-cep"
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              name="address"
              onChange={ this.handleChange }
              value={ address }
              data-testid="checkout-address"
            />
          </label>
          <label htmlFor="payment">
            Forma de pagamento:
            <br />
            Boleto
            <input
              type="radio"
              name="payment"
              onChange={ this.handleChange }
              value="boleto"
              data-testid="ticket-payment"
            />
            VISA
            <input
              type="radio"
              name="payment"
              onChange={ this.handleChange }
              value="visa"
              data-testid="visa-payment"
            />
            MasterCard
            <input
              type="radio"
              name="payment"
              onChange={ this.handleChange }
              value="master"
              data-testid="master-payment"
            />
            Elo
            <input
              type="radio"
              name="payment"
              onChange={ this.handleChange }
              value="elo"
              data-testid="elo-payment"
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            data-testid="checkout-btn"
          >
            Finalizar Compra

          </button>
          { invalidFields && <p data-testid="error-msg">Campos inválidos</p> }
          { redirect && <Redirect to="/" />}
        </form>
        { cartList.map((item) => (
          <div style={ this.style } key={ item.id }>
            <p data-testid="shopping-cart-product-name">{ item.title }</p>
            <p data-testid="shopping-cart-product-quantity">{ item.count }</p>
            <p data-testid="shopping-cart-product-name">{ item.price }</p>
            <p>{`Preço: ${item.count * item.price}`}</p>
          </div>
        ))}
        <div style={ this.style }>
          Preço total:
          {' '}
          { this.totalPrice() }
        </div>
      </div>
    );
  }
}

export default Checkout;
