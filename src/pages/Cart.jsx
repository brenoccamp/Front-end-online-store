import React from 'react';
import { Link } from 'react-router-dom';

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

  render() {
    const { cart } = this.state;
    if (cart.length > 0) {
      return (
        <div>
          {cart.map((element) => (
            <div className="card" key={ element[0].id }>
              <Link
                to={ { pathname: `/product-details/${element[0].id}`,
                  state: { element } } }
                data-testid="product-detail-link"
              >
                <div data-testid="product">
                  <h1 data-testid="shopping-cart-product-name">{ element[0].title }</h1>
                  <img src={ element[0].thumbnail } alt={ element[0].title } />
                  <h3>{`R$: ${element[0].price}`}</h3>
                </div>
              </Link>
              <button
                id={ element[0].id }
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ this.decreaseValue }
              >
                -
              </button>
              <p>Quantidade: </p>
              <p data-testid="shopping-cart-product-quantity">
                { element[1].QUANTIDADE }
              </p>
              <button
                id={ element[0].id }
                type="button"
                data-testid="product-increase-quantity"
                onClick={ this.increaseValue }
                disabled={ this.disableButton(element) }
              >
                +
              </button>
              <button
                id={ element[0].id }
                type="button"
                data-testid=""
                onClick={ this.removeProduct }
              >
                Remover Produto
              </button>
            </div>
          ))}
          <Link to="/checkout">
            <button
              type="button"
              data-testid="checkout-products"
            >
              Finalizar Compra
            </button>
          </Link>
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
