import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    products: []
  }

  fetchProducts = async () => {
    // adicionar chamada ao AWS API Gateway para buscar produtos aqui...
    // em seguida, defini-los em estado...
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`Ocorreu um ERRO: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Produtos Destaques</h1>
            <p className="subtitle is-5">Invista em um futuro limpo com nossos produtos de energia verde eficientes e econômicos:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products && this.state.products.length > 0
                      ? this.state.products.map(product => <Product name={product.productname} id={product.id} key={product.id} />)
                      : <div className="tile notification is-warning"><b>Nenhum produto disponível</b></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
