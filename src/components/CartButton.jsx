import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CartButton extends Component {
  render() {
    const { length } = this.props;
    return (
      <Link to="/cart" data-testid="shopping-cart-button">
        <button
          type="button"
        >
          <p data-testid="shopping-cart-size">{`Carrinho(${length})`}</p>
        </button>
      </Link>
    );
  }
}

CartButton.propTypes = {
  length: PropTypes.number.isRequired,
};
