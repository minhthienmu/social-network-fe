import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { mainRoutes } from "../constants/routePath";

const Loading = lazy(() => import("../component/Loading"));

export const MainRoutes = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={mainRoutes.Loading} exact component={Loading} />
            </Switch>
        </Suspense>
    );
};
