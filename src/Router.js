import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import SearchID from "./pages/SearchID";
import SearchKeyword from "./pages/SearchKeyword";
import EditID from "./pages/EditID";

export default function MyRouter() {
    return (
        <Switch>
            <Route path="/id">
                <SearchID />
            </Route>
            <Route path="/keyword">
                <SearchKeyword />
            </Route>
            <Route path="/edit">
                <EditID />
            </Route>
            <Route path="/">
                <Redirect to="/id" />
            </Route>
        </Switch>
    );
}