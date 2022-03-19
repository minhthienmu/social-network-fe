import React from "react";
import Header from "../component/Header";
import { MainRoutes } from "../routes/routes";

class MainContainer extends React.Component {
    render() {
        return (
            <>
                <div className="header">
                    <Header />
                </div>
                <div className="content">
                    <MainRoutes />
                </div>
            </>
        );
    }
}

export default MainContainer;
