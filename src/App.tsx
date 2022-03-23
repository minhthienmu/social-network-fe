import React from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import MainContainer from "./containers/MainContainer";
//import Header from "component/Header";

const history = createBrowserHistory();
class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <MainContainer />
            </Router>
        );
    }
}

export default App;
