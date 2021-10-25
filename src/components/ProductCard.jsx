import PropTypes from 'prop-types';
import React from 'react';

class ProductCard extends React.Component {
  render() {
    const { element } = this.props;
    return (
      <div className="card" data-testid="product">
        <h1>{ element.title }</h1>
        <img src={ element.thumbnail } alt={ element.title } />
        <h3>{`R$: ${element.price}`}</h3>
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
