import React from 'react';

import classes from "./BuildControls.module.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
]

export default function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map(ctrl => {
                return <BuildControl
                    label={ctrl.label}
                    key={ctrl.type}
                    added={() => props.ingredientsAdded(ctrl.type)}
                    removed={() => props.ingredientsRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}>
                {props.isAuth ? 'Order Now' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    )
}
