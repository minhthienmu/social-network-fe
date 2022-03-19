import React from "react";
import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";
import { mainRoutes } from "./constants/routePath";
import MainContainer from "./containers/MainContainer";

const history = createBrowserHistory();

const mainRoute = Object.values(mainRoutes).map((i) => i);

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route path={mainRoute}>
                    <MainContainer />
                </Route>
            </Router>
        );
    }
}

export default App;
