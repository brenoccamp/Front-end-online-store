import React from 'react';
import PropTypes from 'prop-types';
import CartButton from '../components/CartButton';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.getProductClicked = this.getProductClicked.bind(this);
    this.addCart = this.addCart.bind(this);
    this.state = {
      readyToRender: false,
      length: this.quantityOfProductsAdded(),
    };
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

  quantityOfProductsAdded = () => {
    const storage = JSON.parse(localStorage.getItem('Cart'));
    let productsLength = 0;
    storage.forEach((item) => {
      productsLength += item[1].QUANTIDADE;
    });
    return productsLength;
  }

  updateStorage = (CART, array) => {
    localStorage.setItem('Cart', JSON.stringify([...CART, array]));
    this.setState({ length: this.quantityOfProductsAdded() });
  }

  addCart() {
    const { location: { state: { element } } } = this.props;
    let CART = JSON.parse(localStorage.getItem('Cart'));
    const FILTER = CART.some((item) => item[0].id === element[0].id );
    if (FILTER) {
      CART = CART.forEach((product) => {
        if (product[0].id === element[0].id) {
          product[1].QUANTIDADE += 1;
          const { QUANTIDADE } = product[1];
          const { price } = element[0];
          product[1].priceUnity = price * QUANTIDADE;
          localStorage.setItem('Cart', JSON.stringify(CART));
          this.setState({ length: this.quantityOfProductsAdded() });
        }
      });
    } else {
      const valueProduct = [element, { QUANTIDADE: 1, priceUnity: element.price }];
      CART.push(valueProduct);
      localStorage.setItem('Cart', JSON.stringify(CART));
      this.setState({ length: this.quantityOfProductsAdded() });
    }
  }

  renderByArray = (element) => {
    const { readyToRender } = this.state;
    return (
      !readyToRender ? <p>Carregando...</p> : (
        <div>
          <h1 data-testid="product-detail-name">{element[0].title}</h1>
          <img src={ element[0].thumbnail } alt="title" />
          <p>{`Valor: ${element[0].price} R$`}</p>
          {element[0].attributes.map(({ name, value_name: valueName }, index) => (
            <p key={ index }>{`${name}: ${valueName}`}</p>
          ))}
          <p>{element[0].warranty}</p>
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
      )
    );
  }

  renderByObj = (element) => {
    const { readyToRender } = this.state;
    return (
      !readyToRender ? <p>Carregando...</p> : (
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
      )
    );
  }

  render() {
    const { location: { state: { element } } } = this.props;
    const { length } = this.state;
    return (
      <div>
        <h1>Product Details Page</h1>
        <CartButton length={ length } />
        {Array.isArray(element) ? this.renderByArray(element) : this.renderByObj(element)}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      element: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
        warranty: PropTypes.string,
      }).isRequired,
    }),
  }).isRequired,
};

ProductDetails.propsDefault = {
  warranty: 'Sem garantia',
};

export default ProductDetails;
