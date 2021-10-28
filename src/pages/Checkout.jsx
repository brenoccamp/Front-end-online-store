import React from 'react';
// import PropTypes from 'prop-types';


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    productsCart: [],
    fullname:'',
    email: '',
    adress: '', 
    phone: '',
    cpf: '',
    cep: ''
    };
  }
  componentDidMount() {
    this.loadCart();
  }
  loadCart = () => {
    const LOAD_CART = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ productsCart: LOAD_CART });
  }
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { productsCart } = this.state;
    
    return (
    <div>  
      checkout-products
      <div className="card" > 
      {productsCart.map((element) =>
        <div>
        <h1 >{ element[0].title }</h1>
        <img className="image is-32x32"src={ element[0].thumbnail } alt={ element[0].title } />
        <h3>{element[1].QUANTIDADE}</h3>
        <h3>{`R$: ${element[1].priceUnity}`}</h3>
      </div>
    )}
      </div>
    <div className="info-user"> </div>
      <div class="field is-flex">
        <label class="label" >  
          Nome Completo   
          <div class="control">
          <input  
          class="input" 
          type="text" 
          placeholder="Text input" 
          data-testid="checkout-fullname"
          name="fullname"
          onChange= { this.onInputChange }
          />
          </div>
        </label>

      <div class="field">
        <label class="label">
          Email
          <div class="control has-icons-left has-icons-right">
            <input 
            class="input" 
            type="email" 
            placeholder="Email input"
            name="email"
            onChange= { this.onInputChange }
            data-testid="checkout-email"
            />
          </div>
        </label>
      </div>

        <label class="label">
          CPF
          <div class="control">
            <input 
            data-testid="checkout-cpf" 
            class="input" 
            type="text" 
            placeholder="Text input"
            name="cpf"
            onChange= { this.onInputChange }
            />
         </div>
        </label>
      </div>

      <div class="field is-flex">
        <label class="label">
          Telefone        
          <div class="control has-icons-left has-icons-right">
            <input 
            class="input is-success" 
            data-testid="checkout-phone" 
            type="text" 
            placeholder="Text input" 
            name="phone"
            onChange= { this.onInputChange }            
            />
           </div>
        </label>

        <label class="label">
          Endereço      
          <div class="control has-icons-left has-icons-right">
            <input 
            class="input is-success" 
            data-testid="checkout-address" 
            type="text" 
            placeholder="Text input" 
            name="adress"
            onChange= { this.onInputChange }
            />
           </div>
        </label>
        <label class="label">
          CEP     
          <div class="control has-icons-left has-icons-right">
            <input 
            class="input is-success" 
            data-testid="checkout-cep" 
            type="text" 
            placeholder="Text input" 
            name="cep"
            onChange= { this.onInputChange }
            />
           </div>
        </label>
      </div> 
<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div> 
</div>
    </div> 

    )
}


};

export default Checkout;
