import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import CartButton from '../components/CartButton';

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
      <div className="card product-card">
        <Link
          to={ { pathname: `/product-details/${element.id}`, state: { element } } }
          data-testid="product-detail-link"
          className="link-card"
        >
          <div data-testid="product">
            {(element.shipping.free_shipping)
            && <img className="free-ship" src="https://i.giphy.com/media/XyCufS9J5h5Hgm3K4H/giphy.webp" alt="Frete Gratis" />}
            <div className="div-image">
              <img
                className="image-product"
                src={ element.thumbnail }
                alt={ element.title }
              />
            </div>

            <div className="is-flex is-justify-content-center">
              <p
                className=" title-product has-text-weight-bold has-text-centered"
                data-testid="shopping-cart-product-name has-text-weight-bold"
              >
                { element.title }

              </p>

            </div>
            <div className="price-card is-flex ">
              <p className="has-text-weight-bold is-size-5  has-text-danger">{`R$ ${element.price.toFixed(2)}`}</p>
              <p
                data-testid="shopping-cart-product-quantity"
                className="has-text-weight-bold is-size-7"
              >
                {`Estoque: ${element.available_quantity}`}
              </p>

            </div>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.addCart }
          className="button is-link is-outlined button-card"
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
