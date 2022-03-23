import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { mainRoutes, otherRoutes } from "../constants/routePath";

const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));

export const Routes = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={mainRoutes.Home} exact component={Home} />
                <Route path={otherRoutes.Login} exact component={Login} />
            </Switch>
        </Suspense>
    );
};
