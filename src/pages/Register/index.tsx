import React, { Fragment } from "react";
import { useMutation } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { registerMutation } from "graphql/mutation";

interface Props extends RouteComponentProps {}

const Register = (props: Props) => {
    const [register, { loading, error }] = useMutation(registerMutation);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const fullname = e.target.querySelector('[name="fullname"]').value;
        const username = e.target.querySelector('[name="username"]').value;
        const password = e.target.querySelector('[name="password"]').value;
        try {
            const res = await register({
                variables: {
                    request: {
                        fullName: fullname,
                        username: username,
                        password: password,
                    },
                },
            });
            if (res.data) {
                props.history.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100" style={{ marginLeft: "100px" }}>
                        <a href="/">
                            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                                Review{" "}
                            </span>{" "}
                        </a>
                        <button className="nav-menu me-0 ms-auto"></button>
                    </div>
                </div>

                <div className="row">
                    {/* <div
                        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url("https://via.placeholder.com/800x950.png")` }}
                    ></div> */}
                    <div className="col-xl-12 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">
                                    Create <br />
                                    your account
                                </h2>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                                        <input
                                            type="text"
                                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Your Full Name"
                                            name="fullname"
                                        />
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input
                                            type="text"
                                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Your Username"
                                            name="username"
                                        />
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <input
                                            type="Password"
                                            className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                            placeholder="Password"
                                            name="password"
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input
                                            type="Password"
                                            className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                            placeholder="Confirm Password"
                                            name="confirmpassword"
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1">
                                            <button
                                                className={`form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ${
                                                    loading ? "disable-button" : ""
                                                }`}
                                                disabled={loading}
                                            >
                                                Register
                                            </button>
                                        </div>
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                            Already have account{" "}
                                            <a href="/login" className="fw-700 ms-1">
                                                Login
                                            </a>
                                        </h6>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
