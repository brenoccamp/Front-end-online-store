import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class Content extends Component {
  render() {
    const { result } = this.props;
    return (
      <div>
        {result.map((element) => (
          <ProductCard key={ element.id } element={ element } />
        ))}
      </div>
    );
  }
}

Content.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
};
