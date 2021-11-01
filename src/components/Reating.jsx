import React, { Component } from 'react';

export default class Reating extends Component {
  render() {
    return (
      <div>
        <div className="rating">
          <input type="radio" name="rating" id="rating-5" />
          <label htmlFor="rating-5" />
          <input type="radio" name="rating" id="rating-4" />
          <label htmlFor="rating-4" />
          <input type="radio" name="rating" id="rating-3" />
          <label htmlFor="rating-3" />
          <input type="radio" name="rating" id="rating-2" />
          <label htmlFor="rating-2" />
          <input type="radio" name="rating" id="rating-1" />
          <label htmlFor="rating-1" />          
        </div>
      </div>
    );
  }
}
