import React from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.getProductClicked = this.getProductClicked.bind(this);
    this.state = {
      readyToRender: false,
    }
  }

  componentDidMount() {
    this.getProductClicked();
  }

  async getProductClicked() {
    const timeout = 500;
    setTimeout(() => {
      this.setState({ readyToRender: true })
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
        </div>
        )}
      </div>
    );
  }
}

ProductDetails.propTypes ={
  element: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
    warranty: PropTypes.string.isRequired
  })
}

export default ProductDetails;
