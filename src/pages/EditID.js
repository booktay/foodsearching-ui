import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const styles = makeStyles((theme) => ({
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
        minHeight: '60vh',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function EditID() {
    const classes = styles();

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Edit Food Review by ID</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper component="form" className={classes.searchroot}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Food Reviews Ex. 1"
                                inputProps={{ 'aria-label': 'search food reviews' }}
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
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    beloololo
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    adjective
                                </Typography>
                                <Typography variant="body2" component="p">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}