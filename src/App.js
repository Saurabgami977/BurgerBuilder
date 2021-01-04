import './App.css';
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from './HOC/Layout/Layout';

import React, { Component } from 'react'
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './Containers/Orders/Orders';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </div>
    )
  }
}
