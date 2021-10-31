/* eslint-disable react/jsx-max-depth */
import React from 'react';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import Content from '../components/Content';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.requestApi = this.requestApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateLocal = this.updateLocal.bind(this);
    this.state = {
      searchValue: '',
      result: [],
      id: '',
      search: false,
      length: localStorage.Cart ? JSON.parse(localStorage.getItem('Cart')).length : 0,
    };
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
    console.log('api');
    console.log(this.state);
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

  updateLocal() {
    const GET_LOCAL = JSON.parse(localStorage.getItem('Cart'));
    let quantityOfProductsAdded = 0;
    GET_LOCAL.forEach((product) => {
      quantityOfProductsAdded += Number(product[1].QUANTIDADE);
    });
    this.setState({ length: quantityOfProductsAdded });
  }

  render() {
    const { result, search, id, searchValue, length } = this.state;
    return (
      <section className="main-screen-section">

        <header className="hero is-primary main-screen-header">
          <div
            className="hero-body
          container-input
          is-flex-direction-row
          is-justify-content-space-around
          columns
           "
          >

            <div className="column">
              <img className="imageLogo" src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png" alt="" />
              <p className="subtitle">
                <strong>Store</strong>
              </p>
            </div>

            <div className="column">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    type="text"
                    data-testid="query-input"
                    name="searchValue"
                    onChange={ this.handleChange }
                    value={ searchValue }
                    className="input is-success is-fullwidth"
                  />
                </div>
                <div className="control">
                  <button
                    type="button"
                    data-testid="query-button"
                    onClick={ this.requestApi }
                    className="button is-link is-light"
                  >
                    Pesquisar
                  </button>
                </div>
              </div>
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </div>

            <div className="column">
              <CartButton length={ length } />
            </div>
          </div>

        </header>

        <div className="columns">
          <div className="column">
            <Categories value={ id } handleChange={ this.requestApi2 } />
          </div>
          <div className="column">
            {(search) ? (
              <Content result={ result.results } updateLocal={ this.updateLocal } />
            )
              : <h4>Você ainda não realizou uma busca</h4>}
          </div>

        </div>

      </section>
    );
  }
}

export default Home;
