import axios from 'axios';
import React, { Component } from 'react';
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from '../../Components/Burger/Burger';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { default as Aux, default as Auxiliary } from '../../HOC/Auxiliary/Auxiliary';
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";



const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.1,
    bacon: 0.4
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-38272-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(err => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({ purchaseable: sum > 0 ? true : false })
    }

    addIngredientsHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        };

        let orderSummary = null;
        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientsAdded={this.addIngredientsHandler}
                        ingredientsRemoved={this.removeIngredientsHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, axios);