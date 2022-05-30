import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface AdminRouteProps extends RouteProps {}

const AdminRoute: React.FC<AdminRouteProps> = ({ ...props }) => {
    return <Route {...props} />;
};

export default AdminRoute;
