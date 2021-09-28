import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import Logo from '../../Logo/Logo';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <Logo />
        <NavigationItem link="/video-games">Video&nbsp;Games</NavigationItem>
        <NavigationItem link="/movies">Movies</NavigationItem>
        <NavigationItem link="/books">Books</NavigationItem>
        <div className={classes.KontaktNav}>
            <NavigationItem
                link="/about">
                    What&nbsp;it&nbsp;it?
            </NavigationItem>
        </div>
    </ul>
);

export default NavigationItems;