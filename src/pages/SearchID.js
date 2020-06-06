import React, { Component } from 'react';
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
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    cardroot: {
        display: 'inline-block',
        width: '70vw',
        minHeight: '40vh',
        textAlign: 'left',
        color: '#1b6ca8',
    },
    reviewtext: {
        textAlign: 'left',
        padding: '10px 20px 10px 20px',
        color: '#000000',
    }
});

class SearchID extends Component {
    constructor() {
        super();

        this.state = {
            reviewID : 1,
            reviewText : "Example Text",
        }

    }
    render() {
        const { classes } = this.props;
        const { reviewID, reviewText } = this.state;

        return (
            <div className={classes.root}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Search Food Review by ReviewID</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper component="form" className={classes.searchroot}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search Food Reviews Ex. 1"
                                    autoComplete="1"
                                />
                                <Divider className={classes.divider} orientation="vertical" />
                                <IconButton color="primary" type="submit" className={classes.iconButton} aria-label="directions">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.cardroot}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Review ID
                                </Typography>
                                    <Typography variant="h6" className={classes.reviewtext}>
                                        { reviewID }
                                </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        Review Text
                                </Typography>
                                    <Typography variant="h6" component="p" className={classes.reviewtext}>
                                        { reviewText }
                                </Typography>
                                </CardContent>
                            </Card>
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