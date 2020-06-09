import React from "react";
import {
    Switch,
    HashRouter,
} from "react-router-dom";

import SearchID from "./pages/SearchID";
import SearchKeyword from "./pages/SearchKeyword";
import EditID from "./pages/EditID";

export default function MyRouter() {
    return (
        <Switch>
            <HashRouter path="/keyword">
                <SearchKeyword />
            </HashRouter>
            <HashRouter path="/edit">
                <EditID />
            </HashRouter>
            <HashRouter path="/">
                <SearchID />
            </HashRouter>
        </Switch>
    );
}