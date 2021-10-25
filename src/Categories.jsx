import React from 'react';
import { getCategories } from './services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],

    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    await getCategories().then((response) => this.setState({
      categories: response,
    }));
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="container-categories is-flex ">
        <ul
          className=" is-flex-direction-column is-align-content-left"
        >
          <p className="subtitle">Categorias</p>
          {categories.map((cat) => (
            <li
              className=" is-flex is-align-content-left"
              key={ cat.id }
              data-testid="category"
            >
              <input type="radio" name="rsvp" />
              &nbsp;
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

    );
  }
}

export default Categories;
