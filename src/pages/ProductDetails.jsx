import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartButton from '../components/CartButton';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.getProductClicked = this.getProductClicked.bind(this);
    this.addCart = this.addCart.bind(this);
    this.state = {
      readyToRender: false,
      length: JSON.parse(localStorage.getItem('Cart')).length,
    };
  }


  addCart() {
    const { location: { state: { element } } } = this.props;
    const CART = JSON.parse(localStorage.getItem('Cart'));
    const FILTER = CART.some((element2) => element2[0].id === element.id);
    const QUANTIDADE = 1;
    // if (FILTER) {
    //   alert('Este item ja se encontra no carrinho');
    // } else {
      const valueProduct = { QUANTIDADE, priceUnity: (QUANTIDADE * element.price) };
      const array = [element, valueProduct];
      localStorage.setItem('Cart', JSON.stringify([...CART, array]));
    // }
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
    const { readyToRender, length } = this.state;
    return (
      <div>
        <h1>Product Details Page</h1>
          <CartButton length={ length } />
        {!readyToRender ? <p>Carregando...</p> : (
          <div>
            <h1 data-testid="product-detail-name">{element.title}</h1>
            <img src={ element.thumbnail } alt="title" />
            <p>{`Valor: ${element.price} R$`}</p>
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
          <h2>Avaliações</h2>
          <form className="form-product-details">
            <div className="input-email-evaluation">
              <input
                type="email"
                placeholder="Digite seu email"
                required
              />
              <input
                type="number"
                min="0"
                max="5"
                placeholder="Nota"
                required
              />
            </div>
            <div className="textarea-description-evaluation">
              <textarea 
                maxLength="500"
                placeholder="Mensagem (opcional)"
                rows="6"
                cols="30"
                data-testid="product-detail-evaluation"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={ this.funcToAddEvaluation }
              >
                Avaliar
              </button>
            </div>
          </form>
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
