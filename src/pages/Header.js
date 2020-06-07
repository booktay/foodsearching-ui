import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { NavLink } from "react-router-dom";

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    grow: {
        flexGrow: 1,
    },
    navbar: {
        background: "white",
    },
    link: {
        textDecoration: "none",
        color: "#1b6ca8",
    }
}));

export default function Header() {
    const classes = styles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.headername}>
                        <NavLink to="/" className={classes.link}>Food Searching UI</NavLink>
                    </Typography>
                    <div className={classes.grow} />
                    <ButtonGroup variant="text" aria-label="text primary button group">
                        <Button><NavLink to="/" className={classes.link}>Find Review by ID</NavLink></Button>
                        <Button><NavLink to="/keyword" className={classes.link}>Find Review by Keyword</NavLink></Button>
                        <Button><NavLink to="/edit" className={classes.link}>Edit Review by ID</NavLink></Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
}