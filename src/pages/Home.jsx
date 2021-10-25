import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import Content from '../components/Content';
import { getProductsFromCategoryAndQuery } from '../services/api';

// MERGE TO MASTER

class Home extends React.Component {
  constructor() {
    super();
    this.requestApi = this.requestApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchValue: '',
      result: [],
      id: false,
      search: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async requestApi() {
    const { searchValue, id } = this.state;
    const RESULT = await getProductsFromCategoryAndQuery(id, searchValue);
    this.setState({ result: RESULT, search: true });
  }

  render() {
    const { result, search } = this.state;
    return (
      <section className="main-screen-section">
        <header className="main-screen-header">
          <div className="container-input">
            <input
              type="text"
              data-testid="query-input"
              name="searchValue"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.requestApi }
            >
              Pesquisar
            </button>
          </div>
          <Link to="/cart" data-testid="shopping-cart-button">
            <button
              type="button"
            >
              Carrinho
            </button>
          </Link>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </header>
        <div className="columns">
          <div className="column">
            <Categories />
          </div>
          <div className="column">
            {(search) ? (
              <Content result={ result.results } />
            )
              : <h4>Você ainda não realizou uma busca</h4>}
          </div>
        </div>

      </section>
    );
  }
}

export default Home;
