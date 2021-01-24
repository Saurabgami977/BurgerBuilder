import './App.css';
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from './HOC/Layout/Layout';

import React, { Component } from 'react'
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={Orders} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
