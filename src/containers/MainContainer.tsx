import React, { Fragment } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Header from "../component/Header";
import { Routes } from "../routes/routes";

type PropsType = RouteComponentProps<any>;
class MainContainer extends React.Component<PropsType> {
    render() {
        return (
            <Fragment>
                <div className="header">
                    <Header />
                </div>
                <div className="content">
                    <Routes />
                </div>
            </Fragment>
        );
    }
}

export default withRouter(MainContainer);
