import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';

class ProductCard extends React.Component {
  constructor() {
    super();
    this.addCart = this.addCart.bind(this);
  }

  addCart() {
    const { updateLocal } = this.props;
    const { element } = this.props;
    let CART = JSON.parse(localStorage.getItem('Cart'));
    const FILTER = CART.some((element2) => element2[0].id === element.id);
    if (FILTER) {
      CART = CART.forEach((product) => {
        if (product[0].id === element.id) {
          const { QUANTIDADE } = product[1];
          const { price } = product[0];
          product[1].QUANTIDADE = (QUANTIDADE + 1);
          const quantity = product[1].QUANTIDADE;
          product[1].priceUnity = price * quantity;
          localStorage.setItem('Cart', JSON.stringify(CART));
          updateLocal();
          alert(`Você adicionou outro "${product[0].title}" ao seu carrinho!`);
        }
      });
    } else {
      const valueProduct = { QUANTIDADE: 1, priceUnity: element.price };
      const array = [element, valueProduct];
      localStorage.setItem('Cart', JSON.stringify([...CART, array]));
      updateLocal();
    }
  }

  render() {
    const { element } = this.props;
    return (
      <div className="card">
        <Link
          to={ { pathname: `/product-details/${element.id}`, state: { element } } }
          data-testid="product-detail-link"
        >
          <div data-testid="product">
            <h1 data-testid="shopping-cart-product-name">{ element.title }</h1>
            <img src={ element.thumbnail } alt={ element.title } />
            <h3>{`R$: ${element.price}`}</h3>
            <p
              data-testid="shopping-cart-product-quantity"
            >
              {`Quantidade disponivel: ${element.available_quantity}`}
            </p>
            {(element.shipping.free_shipping)
            && <p data-testid="free-shipping">Frete grátis</p>}
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.addCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    available_quantity: PropTypes.number,
    shipping: PropTypes.shape({ free_shipping: PropTypes.bool }),
  }).isRequired,
  updateLocal: PropTypes.func.isRequired,
};

export default ProductCard;
