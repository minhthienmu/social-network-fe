import React, { Fragment } from "react";

interface Props {
    login: (username: string, password: string) => void;
}

const LoginAdmin = (props: Props) => {
    const { login } = props;

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const username = e.target.querySelector('[name="username"]').value;
        const password = e.target.querySelector('[name="password"]').value;
        login(username, password);
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
                    <div className="col-xl-12 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-3">
                                    Login Admin <br />
                                </h2>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input
                                            type="text"
                                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Your UserName"
                                            name="username"
                                        />
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input
                                            type="Password"
                                            className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                            placeholder="Password"
                                            name="password"
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1">
                                            <button
                                                className={`form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0
                                                }`}
                                            >
                                                Login
                                            </button>
                                        </div>
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

export default React.memo(LoginAdmin);
