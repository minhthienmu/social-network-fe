import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import MainContainer from "./containers/MainContainer";
//import Header from "component/Header";

export const history = createBrowserHistory();
class App extends React.Component {
    render() {
        return (
            <Router>
                <MainContainer />
            </Router>
        );
    }
}

export default App;
