import PropTypes from 'prop-types';
import React from 'react';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleChange2 = ({ target }) => {
    const { handleChange } = this.props;
    handleChange(target.id);
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
            >
              <input
                type="radio"
                name="valeuId"
                onChange={ this.handleChange2 }
                id={ cat.id }
                data-testid="category"
              />
              &nbsp;
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Categories;
