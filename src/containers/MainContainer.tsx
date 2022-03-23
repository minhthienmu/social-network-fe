import { mainRoutes } from "constants/routePath";
import React, { Fragment } from "react";
import Header from "../component/Header";
import { Routes } from "../routes/routes";

const mainRoute = Object.values(mainRoutes).map((i) => i);
class MainContainer extends React.Component {
    render() {
        return (
            <Fragment>
                {mainRoute.includes(window.location.pathname) ? (
                    <div className="header">
                        <Header />
                    </div>
                ) : null}
                <div className="content">
                    <Routes />
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
