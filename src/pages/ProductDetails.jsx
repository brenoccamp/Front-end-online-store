import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.getProductClicked = this.getProductClicked.bind(this);
    this.state = {
      product: 'teste',
      readyToRender: false,
    };
  }

  componentDidMount() {
    this.getProductClicked();
  }

  async getProductClicked() {
    const { match: { params: { id } } } = this.props;
    const itemJSON = await getProductsFromCategoryAndQuery('', '', id);
    // console.log(itemJSON);
    // console.log(id);
    this.setState({ product: itemJSON, readyToRender: true, id });
  }

  funcTste = () => {
    const { product } = this.state;
    console.log(product);
    return (
      <div>
        <h1 data-testid="product-detail-name">{product.title}</h1>
        <img src={ product.thumbnail } alt="title" />
        <p>{product.price}</p>
        {product.attributes.map(({ name, value_name: valueName }, index) => (
          <p key={ index }>{`${name}: ${valueName}`}</p>
        ))}
        <p>{product.warranty}</p>
      </div>
    );
  }

  render() {
    // const {
    //   product,
    //   // {
    //   //   title,
    //   //   thumbnail,
    //   //   price,
    //   //   attributes,
    //   //   warranty,
    //   // },
    //   readyToRender,
    // } = this.state;
    // console.log(product);
    const { readyToRender } = this.state;
    return (
      <div>
        <h1>Product Details Page</h1>
        {readyToRender ? (
          this.funcTste()
        ) : <p>Carregando...</p>}
      </div>
    );
  }
}

export default ProductDetails;
