import { useMutation } from "@apollo/client";
import { loginAdminMutation } from "graphql/mutation";
import React, { Fragment, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginAdmin from "./LoginAdmin";
import Management from "./Management";
import "./style.scss";

interface Props extends RouteComponentProps {}

const Admin = (props: Props) => {
    const [loginAdmin] = useMutation(loginAdminMutation);
    const [isLogin, setIsLogin] = useState(false);

    const login = async (username: string, password: string) => {
        try {
            const res = await loginAdmin({
                variables: {
                    username,
                    password,
                },
            });
            if (res.data.loginAdmin) {
                setIsLogin(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <Fragment>{isLogin ? <Management /> : <LoginAdmin login={login} />}</Fragment>;
};

export default Admin;
