import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "store";

const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: state.authReducer?.isLoggedIn,
    };
};

interface PrivateRouteProps extends ReturnType<typeof mapStateToProps>, RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...props }) => {
    const isLoggedIn = props.isLoggedIn;
    return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

export default connect(mapStateToProps)(PrivateRoute);
