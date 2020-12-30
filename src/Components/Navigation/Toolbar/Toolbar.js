import React from 'react';

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import classe from '../SideDrawer/Hamburger.module.css'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classe.DrawerToggle} onClick={props.click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar
