import React, { Component } from 'react'

import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from "./Layout.module.css";
import Aux from '../Auxiliary/Auxiliary';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer })
    }

    render() {
        return (

            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    click={this.sideDrawerCloseHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                />
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}


export default connect(mapStateToProps, null)(Layout)