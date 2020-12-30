import './App.css';
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from './HOC/Layout/Layout';

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    )
  }
}
