import React from 'react';
// import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsCart: [],
      fullname: '',
      email: '',
      address: '',
      phone: '',
      cpf: '',
      cep: '',
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  loadCart = () => {
    const LOAD_CART = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ productsCart: LOAD_CART });
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const {
      productsCart,
      fullname,
      email,
      address,
      phone,
      cpf,
      cep,
    } = this.state;

    return (
      <div>
        checkout-products
        <div className="card">
          {productsCart.map((element) => (
            <div key={ element[0].title }>
              <h1>{ element[0].title }</h1>
              <img
                className="image is-32x32"
                src={ element[0].thumbnail }
                alt={ element[0].title }
              />
              <h3>{element[1].QUANTIDADE}</h3>
              <h3>{`R$: ${element[1].priceUnity}`}</h3>
            </div>
          ))}
        </div>
        <div className="info-user"> </div>
        <div className="field is-flex">
          <label className="label" htmlFor="fullname">
            Nome Completo
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                data-testid="checkout-fullname"
                name="fullname"
                onChange={ this.onInputChange }
                value={ fullname }
              />
            </div>
          </label>

          <div className="field">
            <label className="label" htmlFor="email">
              Email
              <input
                className="input"
                type="email"
                placeholder="Email input"
                name="email"
                onChange={ this.onInputChange }
                data-testid="checkout-email"
                value={ email }
              />
            </label>
          </div>

          <label className="label" htmlFor="CPF">
            CPF
            <div className="control">
              <input
                data-testid="checkout-cpf"
                className="input"
                type="text"
                placeholder="Text input"
                name="cpf"
                onChange={ this.onInputChange }
                value={ cpf }
              />
            </div>
          </label>
        </div>

        <div className="field is-flex">
          <label className="label" htmlFor="phone">
            Telefone
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                data-testid="checkout-phone"
                type="text"
                placeholder="Text input"
                name="phone"
                onChange={ this.onInputChange }
                value={ phone }
              />
            </div>
          </label>

          <label className="label" htmlFor="address">
            Endereço
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                data-testid="checkout-address"
                type="text"
                placeholder="Text input"
                name="address"
                onChange={ this.onInputChange }
                value={ address }
              />
            </div>
          </label>
          <label className="label" htmlFor="cep">
            CEP
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                data-testid="checkout-cep"
                type="text"
                placeholder="Text input"
                name="cep"
                onChange={ this.onInputChange }
                value={ cep }
              />
            </div>
          </label>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="button" className="button is-link">Submit</button>
          </div>
        </div>
      </div>

    );
  }
}

export default Checkout;
