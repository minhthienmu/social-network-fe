import { mainRoutes } from "constants/routePath";
import React, { Fragment, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "store";
import { setIsLoggedIn } from "store/auth/action";
import { setUser } from "store/user/action";

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            setIsLoggedIn,
            setUser,
        },
        dispatch,
    );

const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: state.authReducer?.isLoggedIn,
        user: state.userReducer?.user,
    };
};

type PropsType = MapStateToProps<any, any> | MapDispatchToProps<any, Dispatch> | RouteComponentProps;

const mainRoute = Object.values(mainRoutes).map((i) => i);
const Header = (props: PropsType) => {
    const { user } = props;
    const [isNoti, setIsNoti] = useState(false);

    const toggleisNoti = () => setIsNoti(!isNoti);

    const logOut = () => {
        props.setIsLoggedIn(false);
        props.history.push("/login");
    };

    const goToPersonalPage = () => {
        window.location.href = `/${user.id}`;
    };

    const notiClass = `${isNoti ? " show" : ""}`;

    return (
        <>
            {props.isLoggedIn ? (
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
                    {/* <form action="#" className="float-left header-search ms-3">
                        <div className="form-group mb-0 icon-input">
                            <i className="feather-search font-sm text-grey-400"></i>
                            <input
                                type="text"
                                placeholder="Start typing to search.."
                                className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
                            />
                        </div>
                    </form> */}

                    <div
                        className="ms-auto bg-transparent-card d-flex bg-greylight pointer"
                        style={{ borderRadius: "50px", width: "max-content" }}
                        onClick={goToPersonalPage}
                    >
                        <figure className="avatar me-2 mb-0">
                            <img src={`assets/images/user.png`} alt="avater" className="shadow-sm rounded-circle w45" />
                        </figure>
                        <h4 className="fw-700 text-grey-900 pe-md-3" style={{ fontSize: "14px", marginTop: "13px" }}>
                            {user.fullName}
                        </h4>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
