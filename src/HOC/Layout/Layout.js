import React, { Component } from 'react'

import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from "./Layout.module.css";
import Aux from '../Auxiliary/Auxiliary';

export default class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer })
    }

    render() {
        return (

            <Aux>
                <Toolbar click={this.sideDrawerCloseHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

