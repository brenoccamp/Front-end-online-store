import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';

class ProductCard extends React.Component {
  constructor() {
    super();
    this.addCart = this.addCart.bind(this);
  }

  addCart() {
    const { element } = this.props;
    const CART = JSON.parse(localStorage.getItem('Cart'));
    localStorage.setItem('Cart', JSON.stringify([...CART, element]));
  }

  render() {
    const { element } = this.props;
    return (
      <div>
        <Link
          to={ { pathname: `/product-details/${element.id}`, state: { element } } }
          data-testid="product-detail-link"
        >
          <div className="card" data-testid="product">
            <h1 data-testid="shopping-cart-product-name">{ element.title }</h1>
            <img src={ element.thumbnail } alt={ element.title } />
            <h3>{`R$: ${element.price}`}</h3>
            <p data-testid="shopping-cart-product-quantity">1</p>
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
  }).isRequired,
};

export default ProductCard;
