import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import SearchboxID from '../components/SearchboxID';
import Cardbox from '../components/Card';

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh'
    }
}));

class Content extends Component {
    constructor() {
        super();

        this.state = {
        
        }

    }

    handleClickSearch() {
        const word = this.state.searchword
        if (word !== "")
            this.getdata(word)
    }

    async getdata(word) {

        const response = await axios.get(webpath, {})
        // console.log(response)
        if (response.status === 200) {
            this.setState(state => {
                state.labels = response.data.rank
                state.clusterData = response.data.datas
                return state
            })
        }
    }
}

export default function SearchID() {
    const classes = styles();

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Search Food Review by ReviewID</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchboxID />
                    </Grid>
                    <Grid item xs={12}>
                        <Cardbox />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}