/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Cart.css';

class Cart extends React.Component {
  constructor() {
    super();
    this.increaseValue = this.increaseValue.bind(this);
    this.decreaseValue = this.decreaseValue.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.removeProductFromDecrease = this.removeProductFromDecrease.bind(this);
    this.state = {
      cart: '',
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  disableButton = (element) => {
    const { QUANTIDADE } = element[1];
    const { available_quantity: inventory } = element[0];
    if (QUANTIDADE === inventory) {
      return true;
    }
    return false;
  }

  removeProduct({ target }) {
    const { cart } = this.state;
    const NEW_CART = cart.filter((element) => element[0].id !== target.id);
    localStorage.setItem('Cart', JSON.stringify(NEW_CART));
    this.loadCart();
  }

  removeProductFromDecrease(id) {
    const { cart } = this.state;
    const NEW_CART = cart.filter((element) => element[0].id !== id);
    localStorage.setItem('Cart', JSON.stringify(NEW_CART));
    this.setState({ cart: NEW_CART });
    this.loadCart();
  }

  decreaseValue({ target }) {
    const CART = JSON.parse(localStorage.getItem('Cart'));
    const ID = target.id;
    const ITEM = CART.find((element) => element[0].id === target.id);
    if (ITEM[1].QUANTIDADE === 1) {
      this.removeProductFromDecrease(ID);
    } else {
      const { price } = ITEM[0];
      const { priceUnity } = ITEM[1];
      CART.reduce((acc, o) => acc.concat(ID.includes(o[0].id)
        ? Object.assign(o[1], { QUANTIDADE: o[1].QUANTIDADE - 1,
          priceUnity: priceUnity - price })
        : o), []);
      localStorage.setItem('Cart', JSON.stringify(CART));
      this.setState({ cart: CART });
    }
  }

  loadCart() {
    const LOAD_CART = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ cart: LOAD_CART });
  }

  // A função 'reduce' que atualiza um objeto sem mudar as suas posições foi retidado do site: https://pt.stackoverflow.com/questions/397104/atualizar-campo-de-uma-sele%C3%A7%C3%A3o-de-um-array-de-objetos-com-filter
  increaseValue({ target }) {
    const CART = JSON.parse(localStorage.getItem('Cart'));
    const ID = target.id;
    const getItemClicked = CART.filter((item) => item[0].id === ID);
    const { price } = getItemClicked[0][0];
    CART.reduce((acc, o) => acc.concat(ID.includes(o[0].id)
      ? Object.assign(o[1], { QUANTIDADE: o[1].QUANTIDADE + 1,
        priceUnity: (o[1].QUANTIDADE + 1) * price })
      : o), []);
    localStorage.setItem('Cart', JSON.stringify(CART));
    this.setState({ cart: CART });
  }

  somaCart = (cart) => {
    if (cart.length > 0) {
      return cart.map((elem) => elem[1].priceUnity).reduce((a, b) => a + b);
    }
    return 0;
  }

  render() {
    const trashIcon = <FontAwesomeIcon icon={ faTrashAlt } />;
    const { cart } = this.state;
    const totalValue = this.somaCart(cart);
    console.log(totalValue);

    if (cart.length > 0) {
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
                  Cart
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
          <main className="cart-container">
            <p className="title">Meu Carrinho</p>
            <div className="columns">
              <div className="column">

                <table className="table card">
                  <thead>
                    <tr>
                      <th>
                        Item
                      </th>

                      <th>
                  &nbsp;
                      </th>

                      <th>
                        Valor
                      </th>

                      <th>
                        Quantidade
                      </th>

                      <th>
                        Total
                      </th>

                      <th>
              &nbsp;
                      </th>
                    </tr>

                  </thead>

                  <tbody>
                    {cart.map((element) => (
                      <tr key={ element[0].id }>
                        {/* Table Cart */}

                        <td>
                          <div className="">
                            <img className="image-cart" src={ element[0].thumbnail } alt={ element[0].title } />
                          </div>
                        </td>

                        <td>
                          <Link
                            className="link-card"
                            to={ { pathname: `/product-details/${element[0].id}`,
                              state: { element } } }
                            data-testid="product-detail-link"
                          >
                            <p data-testid="shopping-cart-product-name" className="title-cart">{ element[0].title }</p>
                          </Link>
                        </td>

                        <td>
                          <p>{`R$ ${element[0].price.toFixed(2)}`}</p>
                        </td>

                        <td>
                          <div className="add-quantity">
                            <button
                              className="button"
                              id={ element[0].id }
                              type="button"
                              data-testid="product-decrease-quantity"
                              onClick={ this.decreaseValue }
                            >
                              -
                            </button>

                            <p className="quantity" data-testid="shopping-cart-product-quantity">
                              { element[1].QUANTIDADE }
                            </p>

                            <button
                              className="button"
                              id={ element[0].id }
                              type="button"
                              data-testid="product-increase-quantity"
                              onClick={ this.increaseValue }
                              disabled={ this.disableButton(element) }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <p className="is-size-4">{`R$ ${element[1].priceUnity.toFixed(2)}`}</p>
                        </td>
                        <td>
                          <button
                            className="button is-danger"
                            id={ element[0].id }
                            type="button"
                            data-testid=""
                            onClick={ this.removeProduct }
                          >
                            {trashIcon}
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="column is-2 total-products ">
                <p><strong>Resumo do Pedido</strong></p>
                <p>{`${cart.length} Produto(s)`}</p>
                <h1>Valor Total</h1>
                <p className="valueCart is-size-3 has-text-info">{`R$ ${totalValue.toFixed(2)}`}</p>

                <Link to="/checkout">
                  <button
                    className="button is-success"
                    type="button"
                    data-testid="checkout-products"
                  >
                    Finalizar Compra
                  </button>
                </Link>
              </div>

            </div>
          </main>
        </div>
      );
    }
    return (
      <div>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}

export default Cart;
