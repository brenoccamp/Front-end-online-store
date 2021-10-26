import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  componentDidMount() {
    if (localStorage !== '') {
      localStorage.setItem('Cart', '[]');
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cart" component={ Cart } />
            <Route path="/product-details/:id" component={ ProductDetails } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
