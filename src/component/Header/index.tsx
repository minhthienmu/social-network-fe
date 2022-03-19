import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="nav-header bg-white shadow-xs border-0">
                <div className="nav-top">
                    <Link to="/">
                        {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i> */}
                        <span
                            className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0"
                            style={{ paddingLeft: "30px" }}
                        >
                            Review{" "}
                        </span>{" "}
                    </Link>
                </div>
                <form action="#" className="float-left header-search ms-3">
                    <div className="form-group mb-0 icon-input">
                        <i className="feather-search font-sm text-grey-400"></i>
                        <input
                            type="text"
                            placeholder="Start typing to search.."
                            className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Header;
