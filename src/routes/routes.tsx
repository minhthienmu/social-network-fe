import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { mainRoutes, otherRoutes, adminRoutes } from "../constants/routePath";
import AdminRoute from "./AdminRoutes";
import AuthRoute from "./AuthRoutes";
import PrivateRoute from "./PrivateRoutes";

const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));
const Home = lazy(() => import("pages/Home"));
const Personal = lazy(() => import("pages/Personal"));
const Setting = lazy(() => import("pages/Setting"));
const Message = lazy(() => import("pages/Message"));
const Provider = lazy(() => import("pages/Provider"));
const Search = lazy(() => import("pages/Search"));
const AllProvider = lazy(() => import("pages/AllProvider"));
const Follower = lazy(() => import("pages/Follower"));
const Following = lazy(() => import("pages/Following"));
const Admin = lazy(() => import("pages/Admin"));

export const Routes = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <AuthRoute path={otherRoutes.Login} exact component={Login} />
                <AuthRoute path={otherRoutes.Register} exact component={Register} />
                <PrivateRoute path={mainRoutes.Home} exact component={Home} />
                <PrivateRoute path={mainRoutes.Setting} exact component={Setting} />
                <PrivateRoute path={mainRoutes.Message} exact component={Message} />
                <PrivateRoute path={mainRoutes.Provider} exact component={Provider} />
                <PrivateRoute path={mainRoutes.Personal} exact component={Personal} />
                <PrivateRoute path={mainRoutes.Search} exact component={Search} />
                <PrivateRoute path={mainRoutes.AllProvider} exact component={AllProvider} />
                <PrivateRoute path={mainRoutes.Follower} exact component={Follower} />
                <PrivateRoute path={mainRoutes.Following} exact component={Following} />
                <AdminRoute path={adminRoutes.Admin} exact component={Admin} />
            </Switch>
        </Suspense>
    );
};
