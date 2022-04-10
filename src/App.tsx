import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import MainContainer from "./containers/MainContainer";
import apollo from "graphql/apollo";
import { ApolloProvider } from "@apollo/client";

export const history = createBrowserHistory();
class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={apollo}>
                <Router>
                    <MainContainer />
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
