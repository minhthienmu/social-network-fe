import React, { Component } from "react";
import { Link } from "react-router-dom";

class Leftnav extends Component {
    render() {
        return (
            <div className="navigation scroll-bar" style={{ zIndex: "1" }}>
                <div className="container ps-0 pe-0">
                    <div className="nav-content">
                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                            <div className="nav-caption fw-600 font-xssss text-grey-500">
                                <span>New </span>Feeds
                            </div>
                            <ul className="mb-1 top-content">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li>
                                    <Link to="/" className="nav-content-bttn open-font">
                                        <i className="feather-edit btn-round-md bg-blue-gradiant me-3"></i>
                                        <span>Feed</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="nav-content-bttn open-font">
                                        <i className="feather-edit btn-round-md bg-gold-gradiant me-3"></i>
                                        <span>My Feed</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/allProvider" className="nav-content-bttn open-font">
                                        <i className="feather-home btn-round-md bg-red-gradiant me-3"></i>
                                        <span>Providers</span>
                                    </Link>
                                </li>
                                {/*<li>
                                    <Link to="/followers" className="nav-content-bttn open-font">
                                        <i className="feather-award btn-round-md bg-red-gradiant me-3"></i>
                                        <span>Followers</span>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>

                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
                            <div className="nav-caption fw-600 font-xssss text-grey-500">
                                <span>Personal </span>
                            </div>
                            <ul className="mb-3">
                                <li>
                                    <Link to="/follower" className="nav-content-bttn open-font">
                                        <i className="font-xl text-current feather-users me-3"></i>
                                        <span>Follower</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/following" className="nav-content-bttn open-font">
                                        <i className="font-xl text-current feather-users me-3"></i>
                                        <span>Following</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/message" className="nav-content-bttn open-font">
                                        <i className="font-xl text-current feather-message-square me-3"></i>
                                        <span>Chat</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                            <div className="nav-caption fw-600 font-xssss text-grey-500">
                                <span></span> Account
                            </div>
                            <ul className="mb-1">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li>
                                    <Link to="/setting" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                        <i className="font-sm feather-settings me-3 text-grey-500"></i>
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/message" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                        <i className="font-sm feather-message-square me-3 text-grey-500"></i>
                                        <span>Chat</span>
                                        <span className="circle-count bg-warning mt-0">23</span>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Leftnav;
