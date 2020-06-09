import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    }
});

class SearchID extends Component {
    constructor() {
        super();

        this.state = {
            searchID : "",
            reviewID : null,
            reviewText : null,
            modifiedDate : null,
        }

        this.getdata = this.getdata.bind(this)
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.searchBox = this.searchBox.bind(this);
        this.resultCard = this.resultCard.bind(this);
        this.handleEmpty = this.handleEmpty.bind(this);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.handleClickSearch()
        }
    }

    handleClickSearch() {
        const { searchID } = this.state
        console.log("search", searchID)
        if (searchID !== "" && /^\d+$/.test(searchID)) {
            this.getdata(searchID)
        } else {
            this.setState(state => {
                state.reviewID="Input Error";
                state.reviewText=null;
                return state
            });
        }
    }

    async getdata(reviewID) {
        axios.defaults.baseURL = 'http://localhost:5555'
        const response = await axios.get('/reviews/' + reviewID, {})
        if (response.status === 200) {
            if (response.data["_source"]) {
                var modifiedDate = new Date(response.data["_source"]["modified"]/1000000);
                modifiedDate = modifiedDate.toUTCString();
                this.setState(state => {
                    state.reviewID = response.data["_source"]["reviewid"];
                    state.reviewText = response.data["_source"]["reviewtext"];
                    state.modifiedDate = modifiedDate;
                    return state
                });
            } else {
                this.setState(state => {
                    state.reviewID = response.data["Message"];
                    state.reviewText = null;
                    return state
                });
            }
        }
    }

    searchBox() {
        const { classes } = this.props;
        const { searchID } = this.state;

        return (
            <Paper component="form" className={classes.searchroot}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Food Reviews Ex. 1"
                    value={searchID}
                    onChange={e => this.setState({ searchID: e.target.value })}
                    onKeyPress={this.handleKeyPress}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} onClick={this.handleClickSearch}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    }

    resultCard() {
        const { classes } = this.props;
        const { reviewID, reviewText, modifiedDate } = this.state;

        return (
            <Card className={classes.cardroot}>
                <CardHeader
                    title={"Review ID : " + reviewID}
                />
                { reviewText ?
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                        Review Text
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.reviewtext}>
                        {reviewText}
                    </Typography>
                    <Typography variant="body2" component="p" color="secondary" className={classes.modifieddate}>
                        Last modified : {modifiedDate}
                    </Typography>
                </CardContent> : this.handleEmpty()}
            </Card>
        );
    }

    handleEmpty() {
        return (
            <Fragment></Fragment>
        );
    }

    render() {
        const { classes } = this.props;
        const { reviewID } = this.state;

        return (
            <div className={classes.root}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Search Food Review by ReviewID</h1>
                        </Grid>
                        <Grid item xs={12}>
                            {this.searchBox()}
                        </Grid>
                        <Grid item xs={12}>
                            {reviewID ? this.resultCard() : this.handleEmpty() }
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

SearchID.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchID);