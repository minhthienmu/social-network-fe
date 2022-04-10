import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "store";

const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: state.authReducer?.isLoggedIn,
    };
};

interface AuthRouteProps extends ReturnType<typeof mapStateToProps>, RouteProps {}

const AuthRoute: React.FC<AuthRouteProps> = ({ ...props }) => {
    const isLoggedIn = props.isLoggedIn;
    return !isLoggedIn ? <Route {...props} /> : <Redirect to="/" />;
};

export default connect(mapStateToProps)(AuthRoute);
