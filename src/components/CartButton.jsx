import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CartButton extends Component {
  render() {
    const { length } = this.props;
    return (
      <Link to="/cart" data-testid="shopping-cart-button">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />

        <button
          type="button"
          className=" button is-link is-light shopping-cart-button float-right"
          data-toggle="shopping-cart-dropdown"
        >
          <i className="fa fa-shopping-cart" />
          <p
            className="text"
            data-testid=" shopping-cart-size"
          >
            {`Carrinho (${length})`}

          </p>
        </button>
      </Link>
    );
  }
}

CartButton.propTypes = {
  length: PropTypes.number.isRequired,
};
