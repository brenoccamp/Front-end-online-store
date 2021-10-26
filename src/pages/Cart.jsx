import React from 'react';
import ProductCard from '../components/ProductCard';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: '',
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  loadCart() {
    const LOAD_CART = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ cart: LOAD_CART });
  }

  render() {
    const { cart } = this.state;
    if (cart.length > 0) {
      return cart.map((element) => (
        <ProductCard key={ element.id } element={ element } />
      ));
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
