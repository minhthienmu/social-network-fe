import Leftnav from "component/LeftNav";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { setIsLoggedIn } from "store/auth/action";

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            setIsLoggedIn,
        },
        dispatch,
    );

interface Props extends RouteComponentProps, ReturnType<typeof mapDispatchToProps> {}

const Setting = (props: Props) => {
    const handleLogOut = () => {
        props.setIsLoggedIn(false);
        props.history.push("/login");
    };
    return (
        <Fragment>
            <Leftnav />
            <div
                className="main-content bg-lightblue2 theme-dark-bg right-chat-active"
                style={{ minHeight: `${window.innerHeight - 20}px` }}
            >
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h4 className="mb-4 font-xxl fw-700 mont-font mb-lg-5 mb-4 font-md-xs">
                                                Settings
                                            </h4>
                                            {/* <div className="nav-caption fw-600 font-xssss text-grey-500 mb-2">
                                                General
                                            </div>
                                            <ul className="list-inline mb-4">
                                                <li className="list-inline-item d-block border-bottom me-0">
                                                    <Link
                                                        to="/accountinformation"
                                                        className="pt-2 pb-2 d-flex align-items-center"
                                                    >
                                                        <i className="btn-round-md bg-primary-gradiant text-white feather-home font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">
                                                            Acount Information
                                                        </h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item d-block border-bottom me-0">
                                                    <Link
                                                        to="/contactinformation"
                                                        className="pt-2 pb-2 d-flex align-items-center"
                                                    >
                                                        <i className="btn-round-md bg-gold-gradiant text-white feather-map-pin font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">Saved Address</h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item d-block me-0">
                                                    <Link
                                                        to="/socialaccount"
                                                        className="pt-2 pb-2 d-flex align-items-center"
                                                    >
                                                        <i className="btn-round-md bg-red-gradiant text-white feather-twitter font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">Social Acount</h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </Link>
                                                </li>
                                            </ul>

                                            <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">
                                                Acount
                                            </div>
                                            <ul className="list-inline mb-4">
                                                <li className="list-inline-item d-block border-bottom me-0">
                                                    <Link to="/payment" className="pt-2 pb-2 d-flex align-items-center">
                                                        <i className="btn-round-md bg-mini-gradiant text-white feather-credit-card font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">My Cards</h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item d-block  me-0">
                                                    <Link
                                                        to="/password"
                                                        className="pt-2 pb-2 d-flex align-items-center"
                                                    >
                                                        <i className="btn-round-md bg-blue-gradiant text-white feather-inbox font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">Password</h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </Link>
                                                </li>
                                            </ul> */}

                                            <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">
                                                General
                                            </div>
                                            <ul className="list-inline">
                                                {/* <li className="list-inline-item d-block border-bottom me-0">
                                                    <Link
                                                        to="/defaultnoti"
                                                        className="pt-2 pb-2 d-flex align-items-center"
                                                    >
                                                        <i className="btn-round-md bg-gold-gradiant text-white feather-bell font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">Notification</h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item d-block border-bottom me-0">
                                                    <a href="/helpbox" className="pt-2 pb-2 d-flex align-items-center">
                                                        <i className="btn-round-md bg-primary-gradiant text-white feather-help-circle font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">Help</h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </a>
                                                </li> */}
                                                <li className="list-inline-item d-block me-0">
                                                    <a
                                                        className="pt-2 pb-2 d-flex align-items-center pointer"
                                                        onClick={handleLogOut}
                                                    >
                                                        <i className="btn-round-md bg-red-gradiant text-white feather-lock font-md me-3"></i>{" "}
                                                        <h4 className="fw-600 font-xsss mb-0 mt-0">Logout</h4>
                                                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(null, mapDispatchToProps)(Setting);
