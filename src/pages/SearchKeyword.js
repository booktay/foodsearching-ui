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
import Pagination from '@material-ui/lab/Pagination';

const axios = require('axios');

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh'
    },
    grow: {
        flexGrow: 1,
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
    cardTotalroot: {
        display: 'inline-block',
        width: '20vw',
        minHeight: '10vh',
        textAlign: 'left',
        color: '#1b6ca8',
    },
    cardTotalcontent: {
        paddingBottom: '24px',
    },
    cardroot: {
        display: 'inline-block',
        width: '73vw',
        textAlign: 'left',
        color: '#1b6ca8',
    },
    cardcontent: {
        paddingTop: 0,
    },
    reviewtext: {
        textAlign: 'left',
        padding: '10px 20px 10px 20px',
        color: '#000000',
    },
    modifieddate: {
        textAlign: 'right',
    },
    paginationroot: {
        display: 'inline-flex',
    }
});

class SearchKeyword extends Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
            foodKeyword: null,
            resultDatas: null,
            errorMessage: null,
            maxScore: null,
            page: 1,
            quantity: 10,
        }

        this.getdata = this.getdata.bind(this)
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.renderStringtoHtml = this.renderStringtoHtml.bind(this);
        this.replaceKeywordString = this.replaceKeywordString.bind(this);
        this.searchBox = this.searchBox.bind(this);
        this.resultCard = this.resultCard.bind(this);
        this.totalCard = this.totalCard.bind(this);
        this.handleEmpty = this.handleEmpty.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleHasresult = this.handleHasresult.bind(this);
        this.handleNoresult = this.handleNoresult.bind(this);
    }

    handleChangePage = (event, value) => {
        this.setState(state => {
            state.page = value;
            return state
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.handleClickSearch()
        }
    }

    handleClickSearch() {
        const { searchKeyword } = this.state

        if (searchKeyword !== "") {
            this.getdata(searchKeyword)
        } else {
            this.setState(state => {
                state.errorMessage = "Input new keyword";
                return state
            });
        }
    }

    async getdata(foodKeyword) {
        axios.defaults.baseURL = 'http://localhost:5555'
        const response = await axios.get('/reviews', {
            "params" : {
                "query": foodKeyword,
            }
        })

        if (response.status === 200) {
            
            if (response.data["hits"]) {
                this.setState(state => {
                    state.foodKeyword = foodKeyword;
                    state.maxScore = response.data['max_score'];
                    state.resultDatas = response.data['hits'];
                    state.quantity = response.data['total']['value'];
                    state.errorMessage = null;
                    return state
                });
            } else {
                this.setState(state => {
                    state.errorMessage = response.data["message"];
                    state.resultDatas = null;
                    return state
                });
            }
        }
    }

    renderStringtoHtml(text) {
        const { classes } = this.props;

        var textConvert = text.join(" ").split("<keyword>").join(`<b style="color:#1b6ca8; font-weight: bold;">`);
        textConvert = textConvert.split("</keyword>").join(`</b>`);

        return (
            <div dangerouslySetInnerHTML={{ __html: textConvert }} className={classes.reviewtext}/>
        );
    }

    replaceKeywordString(fulltext) {
        const { classes } = this.props;
        const { foodKeyword } = this.state;

        
        var textConvert = fulltext.split(foodKeyword).join(`<b style="color:#1b6ca8; font-weight: bold;">` + foodKeyword + `</b>`);

        return (
            <div dangerouslySetInnerHTML={{ __html: textConvert }} className={classes.reviewtext} />
        );
    }

    searchBox() {
        const { classes } = this.props;
        const { searchKeyword } = this.state;

        return (
            <Grid item xs={12}>
                <Paper component="form" className={classes.searchroot}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Food Reviews Ex. ข้าวมันไก่ เนื้อน่อง ตับเครื่องใน"
                        value={searchKeyword}
                        onChange={e => this.setState({ searchKeyword: e.target.value })}
                        onKeyPress={this.handleKeyPress}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={this.handleClickSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
        );
    }

    totalCard() {
        const { classes } = this.props;
        const { foodKeyword, maxScore } = this.state;

        return (
            <Fragment>
                <Grid item xs={6} className={classes.cardTotalroot}>
                    <Card>
                        <CardContent className={classes.cardTotalcontent}>
                            <Typography variant="subtitle1" gutterBottom>
                                Food Keyword : {foodKeyword}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} className={classes.cardTotalroot}>
                    <Card>
                        <CardContent className={classes.cardTotalcontent}>
                            <Typography variant="subtitle1" gutterBottom>
                                Max Similarity Score : {maxScore}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Fragment>
        );
    }

    resultCard(document) {
        const { classes } = this.props;

        const source = document['_source'],
            score = document['_score'],
            id = source['reviewid'];

        var fulltext = document['_source']["reviewtext"],
            text = document['highlight']["reviewtext"];

        var modifiedDate = new Date(source['modified'] / 1000000);
            modifiedDate = modifiedDate.toUTCString();

        return (
            <Grid item xs={12} key={id}>
                <Card className={classes.cardroot}>
                    <CardHeader
                        title={"Review ID : " + id}
                        subheader={"Similarity Score : " + score}
                    />
                    <CardContent className={classes.cardcontent}>
                        <Typography variant="subtitle1" gutterBottom>
                            Similarity Text
                        </Typography>
                        <Typography variant="body1" component="span">
                            {this.renderStringtoHtml(text)}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Full Text
                        </Typography>
                        <Typography variant="body1" component="span">
                            {this.replaceKeywordString(fulltext)}
                        </Typography>
                        <Typography variant="body2" component="p" color="secondary" className={classes.modifieddate}>
                            Last modified : {modifiedDate}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    handlePagination() {
        const { classes } = this.props;
        const { page } = this.state;
        
        var count = this.state.quantity;
        if (count > 100) {
            count = 100
        }
        count = Math.ceil(count / 10);

        return (
            <Grid item xs={12}>
                <Pagination count={count} size="large" className={classes.paginationroot} page={page} onChange={this.handleChangePage} />
            </Grid>
        )
    }

    handleHasresult() {
        const { resultDatas, page } = this.state;
        return (
            <Fragment>
                {this.totalCard()}
                {this.handlePagination()}
                {resultDatas.slice(10 * (page - 1), 10 * page).map(document => (
                    this.resultCard(document)
                ))}
                {this.handlePagination()}
            </Fragment>
        )
    }

    handleNoresult() {
        const { classes } = this.props;
        const { errorMessage } = this.state;

        return (
            <Grid item xs={12}>
                <Card className={classes.cardroot}>
                    <CardHeader
                        title={"Error Message : " + errorMessage }
                    />
                </Card>
            </Grid>
        )
    }

    handleEmpty() {
        return (
            <Fragment></Fragment>
        )
    }

    render() {
        const { classes } = this.props;
        const { resultDatas, errorMessage } = this.state;

        return (
            <div className={classes.root}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Search Top 100 Food Reviews by Matching a Keyword</h1>
                        </Grid>
                        {this.searchBox()}
                        {(resultDatas && !errorMessage) ? this.handleHasresult() : this.handleEmpty()}
                        {(!resultDatas && errorMessage)  ? this.handleNoresult() : this.handleEmpty()}
                    </Grid>
                </Container>
            </div>
        );
    }
}

SearchKeyword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchKeyword);