import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'inline-flex',
        alignItems: 'center',
        width: '70vw',
        height: '7vh',
    },
    input: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function handleClickSearch() {
    alert("id : ", e);
    // const id = this.state.searchword
    // if (word !== "")
    //     this.getdata(word)
}

export default function SearchboxID() {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search Food Reviews Ex. 1"
                inputProps={{ 'aria-label': 'search food reviews' }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" type="submit" className={classes.iconButton} aria-label="directions" onClick={handleClickSearch(e)}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}