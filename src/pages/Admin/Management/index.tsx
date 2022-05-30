import React, { Fragment, useState } from "react";
import PostTable from "./PostTable";
import ProviderTable from "./ProviderTable";
import UserTable from "./UserTable";

interface Props {}

const Management = (props: Props) => {
    const [tab, setTab] = useState("User");

    const changeTab = (key: string) => {
        if (key !== tab) setTab(key);
    };

    const loadTab = () => {
        switch (tab) {
            case "User":
                return <UserTable />;
            case "Provider":
                return <ProviderTable />;
            case "Post":
                return <PostTable />;
        }
    };

    return (
        <Fragment>
            <div className="navigation scroll-bar" style={{ zIndex: "1" }}>
                <div className="container ps-0 pe-0">
                    <div className="nav-content">
                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                            <div className="nav-caption fw-600 font-xssss text-grey-500">
                                <span>Search </span>Results
                            </div>
                            <ul className="mb-1 top-content">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li>
                                    <a
                                        className="nav-content-bttn open-font pointer"
                                        onClick={() => {
                                            changeTab("User");
                                        }}
                                    >
                                        <i className="feather-user btn-round-md bg-blue-gradiant me-3"></i>
                                        <span>User</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="nav-content-bttn open-font pointer"
                                        onClick={() => {
                                            changeTab("Provider");
                                        }}
                                    >
                                        <i className="feather-home btn-round-md bg-gold-gradiant me-3"></i>
                                        <span>Provider</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="nav-content-bttn open-font pointer"
                                        onClick={() => {
                                            changeTab("Post");
                                        }}
                                    >
                                        <i className="feather-edit btn-round-md bg-red-gradiant me-3"></i>
                                        <span>Post</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content bg-lightblue2 theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">
                                        {tab}
                                    </h2>
                                </div>
                                <div className="row ps-2 pe-1">{loadTab()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default React.memo(Management);
