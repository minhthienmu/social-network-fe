import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface AuthRouteProps extends RouteProps {}

const AuthRoute: React.FC<AuthRouteProps> = ({ ...rest }) => {
    //TODO: check isLoggedIn
    const isLoggedIn = true;
    return !isLoggedIn ? <Route {...rest} /> : <Redirect to="/" />;
};

export default AuthRoute;
