import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

export default function Burger(props) {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredients key={ingKey + i} type={ingKey} />
            })
        })
        .reduce((arr, newArr) => {
            return arr.concat(newArr)
        }, [])
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};
