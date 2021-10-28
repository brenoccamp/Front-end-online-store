import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import Content from '../components/Content';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.requestApi = this.requestApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.teste = this.teste.bind(this);
    this.state = {
      searchValue: '',
      result: [],
      id: '',
      search: false,
      length: localStorage.Cart ? JSON.parse(localStorage.getItem('Cart')).length : 0
    };
  }

  teste() {
    const GET_LOCAL = JSON.parse(localStorage.getItem('Cart')).length
    this.setState({length: GET_LOCAL})
  }
  
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  requestApi2 = (radioid) => {
    this.setState({
      id: radioid,
      searchValue: '',
    }, () => {
      const { searchValue, id } = this.state;
      getProductsFromCategoryAndQuery(id, searchValue).then((result) => {
        this.setState({ result, search: true });
      });
    });
  }

  requestApi = async () => {
    this.setState({
      id: '',
    }, () => {
      const { searchValue, id } = this.state;
      getProductsFromCategoryAndQuery(id, searchValue).then((result) => {
        this.setState({ result, search: true, searchValue: '' });
      });
    });
  }

  render() {
    const { result, search, id, searchValue, length } = this.state;
    return (
      <section className="main-screen-section">
        <header className="main-screen-header">
          <div className="container-input">
            <input
              type="text"
              data-testid="query-input"
              name="searchValue"
              onChange={ this.handleChange }
              value={ searchValue }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.requestApi }
            >
              Pesquisar
            </button>
          </div>
          <CartButton length={ length } />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </header>
        <div className="columns">
          <div className="column">
            <Categories value={ id } handleChange={ this.requestApi2 } />
          </div>
          <div className="column">
            {(search) ? (
              <Content result={ result.results } teste={ this.teste } />
            )
              : <h4>Você ainda não realizou uma busca</h4>}
          </div>
        </div>

      </section>
    );
  }
}

export default Home;
