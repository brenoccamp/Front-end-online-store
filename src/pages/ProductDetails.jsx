import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.getProductClicked = this.getProductClicked.bind(this);
    this.state = {
      product: {},
      readyToRender: false,
    };
  }

  componentDidMount() {
    this.getProductClicked();
  }

  async getProductClicked() {
    const { match: { params: { id } } } = this.props;
    // const dataItem = await fetch(`https://api.mercadolibre.com/items/${id}`);
    // const itemJSON = await dataItem.json();
    // this.setState({ product: itemJSON, readyToRender: true });
    // console.log(itemJSON);
    const itemJSON = await getProductsFromCategoryAndQuery('', '', id);
    console.log(itemJSON);
    this.setState({ product: itemJSON, readyToRender: true });
    console.log(id);
  }

  render() {
    const {
      product:
      {
        title,
        thumbnail,
        price,
        attributes,
        warranty,
      },
      id,
      readyToRender,
    } = this.state;
    return (
      <div>
        <h1>Product Details Page</h1>
        {readyToRender && (
          <div>
            <h1 data-testid="product-detail-name">{title}</h1>
            <img src={ thumbnail } alt="title" />
            <p>{price}</p>
            {attributes.map(({ name, value_name: valueName }) => (
              <p key={ id }>{`${name}: ${valueName}`}</p>
            ))}
            <p>{warranty}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetails;
