import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh'
    }
}));

export default function EditID() {
    const classes = styles();

    return (
        <div className={classes.root}>
            <Container>
                <h1>EditID</h1>
            </Container>
        </div>
    );
}