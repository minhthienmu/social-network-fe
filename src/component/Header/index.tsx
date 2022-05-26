import React, { Fragment, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "store";
import { setIsLoggedIn } from "store/auth/action";
import { setUser } from "store/user/action";
import { useSubscription } from "@apollo/client";
import { notificationSubscription } from "graphql/sub";
//import isEqual from "react-fast-compare";

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

//let currentNoti: any = null;

const Header = (props: PropsType) => {
    const { user } = props;
    const [isNoti, setIsNoti] = useState(false);
    const [isNewNoti, setIsNewNoti] = useState(false);
    const { data: notification, loading } = useSubscription(notificationSubscription, {
        variables: {
            userId: user.id,
        },
    });

    const toggleisNoti = () => {
        setIsNoti(!isNoti);
        setIsNewNoti(false);
    };

    const goToPersonalPage = () => {
        window.location.href = `/user/${user.id}`;
    };

    const onSearch = async (e: any) => {
        e.preventDefault();
        const keyword = e.target.querySelector('[name="keyword"]').value;
        window.location.href = `/search?q=${keyword}`;
    };

    if (!loading) {
        console.log(notification);
        if (notification && isNewNoti === false) {
            setIsNewNoti(true);
            const notificationObj = {
                fromUserId: notification.notification.fromUserId,
                postId: notification.notification.postId,
                toUserId: notification.notification.toUserId,
                type: notification.notification.type,
            };
            // if (!isEqual(currentNoti, noficationObj)) {
            //     console.log("vô đây");
            //     currentNoti = { ...noficationObj };
            //     setIsNewNoti(true);
            // }
        }
    }

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
                    <form className="float-left header-search ms-3" onSubmit={onSearch}>
                        <div className="form-group mb-0 icon-input">
                            <i className="feather-search font-sm text-grey-400"></i>
                            <input
                                type="text"
                                placeholder="Start typing to search.."
                                className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
                                name="keyword"
                            />
                        </div>
                    </form>
                    <div className="d-flex ms-auto">
                        <span
                            className={`p-2 pointer text-center ms-auto menu-icon me-3`}
                            id="dropdownMenu3"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleisNoti}
                        >
                            {isNewNoti ? <span className="dot-count bg-warning"></span> : null}
                            <i className="feather-bell font-xl text-current"></i>
                        </span>
                        <div
                            className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg ${notiClass}`}
                            aria-labelledby="dropdownMenu3"
                        >
                            <h4 className="fw-700 font-xss mb-4">Notification</h4>
                            <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                                <img
                                    src="/assets/images/user.png"
                                    alt="user"
                                    className="w40 position-absolute left-0"
                                />
                                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                    Tâm{" "}
                                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 3 min</span>
                                </h5>
                                <h6 className="text-grey-500 fw-500 font-xssss lh-4">commented on your review</h6>
                            </div>
                            <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                                <img
                                    src="/assets/images/user.png"
                                    alt="user"
                                    className="w40 position-absolute left-0"
                                />
                                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                    Tâm{" "}
                                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 2 min</span>
                                </h5>
                                <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                    has dropped a star for your review
                                </h6>
                            </div>
                            <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                                <img
                                    src="/assets/images/user.png"
                                    alt="user"
                                    className="w40 position-absolute left-0"
                                />
                                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                    Tâm{" "}
                                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 2 min</span>
                                </h5>
                                <h6 className="text-grey-500 fw-500 font-xssss lh-4">is followed you</h6>
                            </div>
                        </div>
                        <div
                            className="bg-transparent-card d-flex bg-greylight pointer h-100"
                            style={{ borderRadius: "50px", width: "max-content" }}
                            onClick={goToPersonalPage}
                        >
                            <figure className="avatar me-2 mb-0">
                                <img
                                    src={`/assets/images/user.png`}
                                    alt="avater"
                                    className="shadow-sm rounded-circle w45"
                                />
                            </figure>
                            <h4
                                className="fw-700 text-grey-900 pe-md-3"
                                style={{ fontSize: "14px", marginTop: "13px" }}
                            >
                                {user.fullName}
                            </h4>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
