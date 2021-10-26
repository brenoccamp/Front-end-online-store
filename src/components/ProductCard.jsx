import PropTypes from 'prop-types';
import React from 'react';

class ProductCard extends React.Component {
  constructor() {
    super();
    this.addCart = this.addCart.bind(this);
  }

  addCart() {
    const { element } = this.props;
    const favoriteSongs = JSON.parse(localStorage.getItem('Cart'));
    localStorage.setItem('Cart', JSON.stringify([...favoriteSongs, element]));
  }

  render() {
    const { element } = this.props;
    return (
      <div className="card" data-testid="product">
        <h1>{ element.title }</h1>
        <img src={ element.thumbnail } alt={ element.title } />
        <h3>{`R$: ${element.price}`}</h3>
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
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
export default ProductCard;
