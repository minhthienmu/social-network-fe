import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { mainRoutes, otherRoutes } from "../constants/routePath";
import AuthRoute from "./AuthRoutes";
import PrivateRoute from "./PrivateRoutes";

const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));
const Home = lazy(() => import("pages/Home"));
const Personal = lazy(() => import("pages/Personal"));
const Setting = lazy(() => import("pages/Setting"));

export const Routes = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <AuthRoute path={otherRoutes.Login} exact component={Login} />
                <AuthRoute path={otherRoutes.Register} exact component={Register} />
                <PrivateRoute path={mainRoutes.Home} exact component={Home} />
                <PrivateRoute path={mainRoutes.Setting} exact component={Setting} />
                <PrivateRoute path={mainRoutes.Personal} exact component={Personal} />
            </Switch>
        </Suspense>
    );
};
