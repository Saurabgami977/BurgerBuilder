import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

export default class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Saurav Gami",
                address: {
                    street: 'Danfe Tole',
                    zipCode: '446600',
                    country: 'Nepal',
                },
                email: 'saurabgami977@gmail.com',
                deliveryMethod: 'byBike'
            }
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/orders')
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Enter your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Enter your Mail" />
                <Input inputtype="input" type="text" name="street" placeholder="Street Address" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal code" />
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
