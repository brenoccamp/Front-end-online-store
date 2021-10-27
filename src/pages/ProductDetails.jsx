import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.getProductClicked = this.getProductClicked.bind(this);
    this.addCart = this.addCart.bind(this);
    this.state = {
      readyToRender: false,
    };
  }

  addCart() {
    const { location: { state: { element } } } = this.props;
    const CART = JSON.parse(localStorage.getItem('Cart'));
    const FILTER = CART.some((element2) => element2[0].id === element.id);
    const QUANTIDADE = 1;
    if (FILTER) {
      alert('Este item ja se encontra no carrinho');
    } else {
      const valueProduct = { QUANTIDADE, priceUnity: (QUANTIDADE * element.price) };
      const array = [element, valueProduct];
      localStorage.setItem('Cart', JSON.stringify([...CART, array]));
    }
  }

  componentDidMount() {
    this.getProductClicked();
  }

  async getProductClicked() {
    const timeout = 500;
    setTimeout(() => {
      this.setState({ readyToRender: true });
    }, timeout);
  }

  render() {
    const { location: { state: { element } } } = this.props;
    const { readyToRender } = this.state;
    return (
      <div>
        <h1>Product Details Page</h1>
        {!readyToRender ? <p>Carregando...</p> : (
          <div>
            <h1 data-testid="product-detail-name">{element.title}</h1>
            <img src={ element.thumbnail } alt="title" />
            <p>{element.price}</p>
            {element.attributes.map(({ name, value_name: valueName }, index) => (
              <p key={ index }>{`${name}: ${valueName}`}</p>
            ))}
            <p>{element.warranty}</p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.addCart }
            >
              Adicionar ao carrinho
            </button>
            <Link to="/cart" data-testid="shopping-cart-button">
            <button
              type="button"
            >
              Carrinho
            </button>
          </Link>
          </div>
        )}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      element: PropTypes.shape({
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default ProductDetails;
