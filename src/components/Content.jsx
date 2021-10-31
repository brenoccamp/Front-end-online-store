import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class Content extends Component {
  render() {
    const { result, updateLocal } = this.props;
    return (
      <>
        {result.map((element) => (
          <ProductCard
            key={ element.id }
            element={ element }
            updateLocal={ updateLocal }
          />
        ))}
      </>
    );
  }
}

Content.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateLocal: PropTypes.func.isRequired,
};
