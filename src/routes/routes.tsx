import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { mainRoutes, otherRoutes } from "../constants/routePath";
import AuthRoute from "./AuthRoutes";
import PrivateRoute from "./PrivateRoutes";

const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));

export const Routes = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <PrivateRoute path={mainRoutes.Home} exact component={Home} />
                <AuthRoute path={otherRoutes.Login} exact component={Login} />
                <AuthRoute path={otherRoutes.Register} exact component={Register} />
            </Switch>
        </Suspense>
    );
};
