import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux'

import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from '../../Components/Burger/Burger';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { default as Aux, default as Auxiliary } from '../../HOC/Auxiliary/Auxiliary';
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions/action';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://burger-builder-38272-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data })
        //     })
        //     .catch(err => {
        //         this.setState({ error: true })
        //     });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        };

        let orderSummary = null;
        let burger = <Spinner />

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} />;
        };

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))