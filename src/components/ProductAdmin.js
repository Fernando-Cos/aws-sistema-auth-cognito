import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newproduct: { 
      "productname": "", 
      "id": ""
    },
    products: []
  }

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    // adicionar chamada para AWS API Gateway adicionar endpoint do produto aqui...
    try {
      const params = {
        "id": id,
        "productname": this.state.newproduct.productname
      };
      await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      this.setState({ products: [...this.state.products, this.state.newproduct] });
      this.setState({ newproduct: { "productname": "", "id": "" }});
    }catch (err) {
      console.log(`Ocorreu um novo ERRO!: ${err}`);
    }
  }

  handleUpdateProduct = async (id, name) => {
    // adicione uma chamada para o ponto de extremidade do produto de atualização do AWS API Gateway aqui...
    try {
      const params = {
        "id": id,
        "productname": name
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const productToUpdate = [...this.state.products].find(product => product.id === id);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      productToUpdate.productname = name;
      updatedProducts.push(productToUpdate);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // adicionar chamada para AWS API Gateway excluir endpoint do produto aqui
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchProducts = async () => {
    // adicione uma chamada ao AWS API Gateway para buscar produtos aqui
    // em seguida, coloque-os no estado
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "productname": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Produtos ADM</h1>
            <p className="subtitle is-5">Adicione e remova produtos usando o formulário abaixo!</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Nome"
                        value={this.state.newproduct.productname}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Id"
                        value={this.state.newproduct.id}
                        onChange={this.onAddProductIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-success is-medium">
                        Adicionar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products.map((product, index) => 
                        <Product 
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct} 
                          name={product.productname} 
                          id={product.id}
                          key={product.id}
                        />)
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
