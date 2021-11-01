import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Checkout.css';
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

  somaCart = (cart) => {
    if (cart.length > 0) {
      return cart.map((elem) => elem[1].priceUnity).reduce((a, b) => a + b);
    }
    return 0;
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
    const totalValue = this.somaCart(productsCart);

    return (
      <div>
        <header className="hero is-primary main-screen-header">
          <div
            className="hero-body
          container-input
          is-flex-direction-row
          is-justify-content-space-around
          columns
          is-align-items-start
           "
          >

            <div className="column">
              <img className="imageLogo" src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png" alt="" />
              <p className="subtitle">
                <strong>Store</strong>
              </p>
            </div>

            <div className="column pt-6">
              <p className="title" data-testid="home-initial-message">
                Checkout
              </p>
            </div>

            <div className="column pt-6">
              <Link to="/">
                <button
                  type="button"
                  className=" button is-link is-light shopping-cart-button float-right"
                >
                  Voltar a home

                </button>
              </Link>
            </div>
          </div>

        </header>

        <main className="checkout-container">
          <p className="title">Detalhes do Pedido</p>
          <table className="table table-checkout">

            <tbody>

              {productsCart.map((element) => (
                <tr key={ element[0].id }>
                  {/* Che Cart */}
                  <td className="td-checkout">
                    <div className="">
                      <img className="image-checkout" src={ element[0].thumbnail } alt={ element[0].title } />
                    </div>
                  </td>

                  <td>

                    <p data-testid="shopping-cart-product-name" className="title-checkout">{ element[0].title }</p>

                  </td>

                  <td>
                    <p>{`R$ ${element[0].price.toFixed(2)}`}</p>
                  </td>

                  <td>

                    <p className="quantity" data-testid="shopping-cart-product-quantity">
                      { element[1].QUANTIDADE }
                    </p>

                  </td>
                  <td>
                    <p className="is-size-4">{`R$ ${element[1].priceUnity.toFixed(2)}`}</p>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td />
                <td />
                <td className="is-size-4">Total:</td>
                <td />
                <td>
                  <p className="valueCart is-size-4 has-text-info">{`R$ ${totalValue.toFixed(2)}`}</p>
                </td>
              </tr>
            </tfoot>
          </table>
          <p p className="is-size-4">Dados do comprador</p>
          
          <div className="info-user">
           
            <div className="field is-flex">
              <label className="label" htmlFor="fullname">
                Nome Completo
                <div className="control has-icons-left has-icons-right">
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

              <label className="label" htmlFor="email">
                Email
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email input"
                    name="email"
                    onChange={ this.onInputChange }
                    data-testid="checkout-email"
                    value={ email }
                  />
                </div>
              </label>

              <label className="label" htmlFor="CPF">
                CPF
                <div className="control has-icons-left has-icons-right">
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
                <button type="button" className="button is-link">Finalizar o pedido</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Checkout;
