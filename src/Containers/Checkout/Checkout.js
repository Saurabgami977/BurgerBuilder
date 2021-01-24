import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandeler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandeler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return (
            <div>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps, null)(Checkout)
