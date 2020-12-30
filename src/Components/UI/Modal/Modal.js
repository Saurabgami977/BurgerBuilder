import React, { Component } from 'react';
import Auxiliary from '../../../HOC/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

export default class Modal extends Component {

    //Returns true if show changes with respect to previous show state and only updates this component
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    //Debugger
    // componentWillUpdate() {
    //     console.log('hey')
    // }

    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }
                    }>
                    {this.props.children}
                </div >
            </Auxiliary>
        )
    }
}
