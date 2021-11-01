import React from 'react';
import PropTypes from 'prop-types';
import CartButton from '../components/CartButton';
import Reating from '../components/Reating';

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
    if (Array.isArray(element)) {
      const FILTER = CART.some((item) => item[0].id === element[0].id);
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
    } else {
      const FILTER = CART.some((item) => item[0].id === element.id);
      if (FILTER) {
        CART = CART.forEach((product) => {
          if (product[0].id === element.id) {
            product[1].QUANTIDADE += 1;
            const { QUANTIDADE } = product[1];
            const { price } = element;
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
  }

  renderByArray = (element) => {
    const { readyToRender } = this.state;
    return (
      !readyToRender ? <p>Carregando...</p> : (
        <div>
          <h1 className="is-size-5 has-text-weight-bold mt-5" data-testid="product-detail-name">{element[0].title}</h1>
          <div className="columns m-1 mt-3">
            <div className="column ">
              <img className="image-details" src={ element[0].thumbnail } alt="title" />
            </div>
            <div
              className="column is-one-quarter price-details"
            >
              <p className="has-text-weight-bold has-text-danger is-size-3">{`R$ ${element[0].price.toFixed(2)}`}</p>
              <p>Meios de pagamentos:</p>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPf2WHW1T41_h9UopmSDGvFh7ygnN501bU9EznLFQTeGce3TlSlWtCPUr8ric9jw8_m8&usqp=CAU" alt="card" />
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.addCart }
                className="button is-link is-light"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
          <div className="is-flex-direction-column product-details-div is-align-items-self-start ">
            <p className="product-details has-text-weight-bold is-size-5">Detalhes do Produto</p>
            {element[0].attributes.map(({ name, value_name: valueName }, index) => (
              <p className="product-details" key={ index }>{`${name}: ${valueName}`}</p>
            ))}
            <p className="product-details">{element.warranty}</p>
          </div>

          <div className="form-product-details">
            <p className="title">Avaliações</p>
            <div className="input-email-evaluation">
              <input
                type="email"
                placeholder="Digite seu email"
                required
                className="input is-primary"
              />
            </div>
            <Reating />
            <div className="textarea-description-evaluation">
              <textarea
                maxLength="500"
                placeholder="Mensagem (opcional)"
                rows="6"
                cols="30"
                data-testid="product-detail-evaluation"
                className="textarea"
              />
            </div>
            <div>
              <button
                type="button"
                className="button is-success"
              >
                Avaliar
              </button>
            </div>
          </div>
        </div>
      )
    );
  }

  renderByObj = (element) => {
    const { readyToRender } = this.state;
    return (
      !readyToRender ? <p>Carregando...</p> : (
        <div>
          <h1 className="is-size-5 has-text-weight-bold mt-5" data-testid="product-detail-name">{element.title}</h1>
          <div className="columns m-1 mt-3">
            <div className="column ">
              <img className="image-details" src={ element.thumbnail } alt="title" />
            </div>
            <div
              className="column is-one-quarter price-details"
            >
              <p className="has-text-weight-bold has-text-danger is-size-3">{`R$ ${element.price.toFixed(2)}`}</p>
              <p>Meios de pagamentos:</p>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPf2WHW1T41_h9UopmSDGvFh7ygnN501bU9EznLFQTeGce3TlSlWtCPUr8ric9jw8_m8&usqp=CAU" alt="card" />
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.addCart }
                className="button is-link is-light"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
          <div className="is-flex-direction-column product-details-div is-align-items-self-start ">
            <p className="product-details has-text-weight-bold is-size-5">Detalhes do Produto</p>
            {element.attributes.map(({ name, value_name: valueName }, index) => (
              <p className="product-details" key={ index }>{`${name}: ${valueName}`}</p>
            ))}
            <p className="product-details">{element.warranty}</p>
          </div>

          <div className="form-product-details">
            <p className="title">Avaliações</p>
            <div className="input-email-evaluation">
              <input
                type="email"
                placeholder="Digite seu email"
                required
                className="input is-primary"
              />
            </div>
            <Reating />
            <div className="textarea-description-evaluation">
              <textarea
                maxLength="500"
                placeholder="Mensagem (opcional)"
                rows="6"
                cols="30"
                data-testid="product-detail-evaluation"
                className="textarea"
              />
            </div>
            <div>
              <button
                type="button"
                className="button is-success"
              >
                Avaliar
              </button>
            </div>
          </div>
        </div>
      )
    );
  }

  render() {
    const { location: { state: { element } } } = this.props;
    const { length } = this.state;
    return (
      <div>
        <header className="hero is-primary main-screen-header">
          <div
            className="hero-body
          container-input
          is-flex-direction-row
          is-justify-content-space-around
          columns
          is-align-items-start
           "
          >

            <div className="column">
              <img className="imageLogo" src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png" alt="" />
              <p className="subtitle">
                <strong>Store</strong>
              </p>
            </div>

            <div className="column pt-6">
              <p className="title" data-testid="home-initial-message">
                Detalhes
              </p>
            </div>

            <div className="column pt-6">
              <CartButton length={ length } />
            </div>
          </div>

        </header>
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
