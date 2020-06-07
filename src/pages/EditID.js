import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const axios = require('axios');

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh'
    },
    searchroot: {
        padding: '2px 4px',
        display: 'inline-flex',
        alignItems: 'center',
        width: '73vw',
        minHeight: '7vh',
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
    cardroot: {
        display: 'inline-block',
        width: '73vw',
        textAlign: 'left',
        color: '#1b6ca8',
    },
    reviewtext: {
        textAlign: 'left',
        padding: '10px 20px 10px 20px',
        color: '#000000',
    },
    modifieddate: {
        textAlign: 'right',
    },
    textfield: {
        backgroundColor: "white",
    }
});

class EditID extends Component {
    constructor() {
        super();

        this.state = {
            searchID: "",
            modifiedText: "",
        }

        this.editdata = this.editdata.bind(this)
        this.handleClickSearch = this.handleClickSearch.bind(this);

        this.searchBox = this.searchBox.bind(this);
        this.inputBox = this.inputBox.bind(this);
        this.handleEmpty = this.handleEmpty.bind(this);
    }

    handleClickSearch() {
        const { searchID, modifiedText } = this.state

        if (searchID !== "" && /^\d+$/.test(searchID)) {
            this.editdata(searchID, modifiedText)
        }
    }

    async editdata(reviewID, modifiedText) {
        axios.defaults.baseURL = 'http://localhost:5555'
        const response = await axios.put('/reviews/' + reviewID, modifiedText, {})
        if (response.status === 200) {
            if (response.data["result"] === "updated" && response.data["id"]) {
                alert("Update Successful")
            } else {
                alert("Update Unsuccessful")
            }
        }
    }

    searchBox() {
        const { classes } = this.props;
        const { searchID } = this.state;

        return (
            <Grid item xs={12}>
                <Paper component="form" className={classes.searchroot}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Food Reviews Ex. 1"
                        value={searchID}
                        onChange={e => this.setState({ searchID: e.target.value })}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary" className={classes.iconButton} onClick={this.handleClickSearch}>
                        <EditIcon />
                    </IconButton>
                </Paper>
            </Grid>
        );
    }

    inputBox() {
        const { classes } = this.props;
        const { modifiedText } = this.state;

        return (
            <Grid item xs={12}>
                <Paper component="form" className={classes.searchroot}>
                    <InputBase
                        className={classes.input}
                        placeholder="Input Text Here"
                        value={modifiedText}
                        multiline
                        fullWidth
                        rows={10}
                        rowsMax={10}
                        onChange={e => this.setState({ modifiedText: e.target.value })}
                    />
                </Paper>
            </Grid>
        );
    }

    handleEmpty() {
        return (
            <Fragment></Fragment>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Edit Food Review by reviewID</h1>
                        </Grid>
                        {this.searchBox()}
                        {this.inputBox()}
                    </Grid>
                </Container>
            </div>
        );
    }
}

EditID.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditID);