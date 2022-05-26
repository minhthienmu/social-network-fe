import { useLazyQuery } from "@apollo/client";
import Leftnav from "component/LeftNav";
import { queryFollower } from "graphql/query";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "store";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends RouteComponentProps, ReturnType<typeof mapStateToProps> {}

const Follower = (props: Props) => {
    const { user } = props;
    const [follower, setFollower] = useState([]);
    const [getFollower] = useLazyQuery(queryFollower);

    useEffect(() => {
        (async () => {
            const res = await getFollower({
                variables: {
                    userId: user.id,
                    last: 20,
                },
            });
            setFollower(res.data.follower);
        })();
    }, []);

    return (
        <Fragment>
            <Leftnav />
            <div className="main-content bg-lightblue2 theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="row ps-2 pe-1">
                                    {follower.map((item: any) => {
                                        return (
                                            <div key={item.id} className="col-md-4 col-sm-6 pe-2 ps-2">
                                                <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                                    <div className="card-body d-block w-100 p-4 text-center">
                                                        <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                                                            <img
                                                                src={`assets/images/user.png`}
                                                                alt="avater"
                                                                className="float-right p-1 bg-white rounded-circle w-100"
                                                            />
                                                        </figure>
                                                        <div className="clearfix"></div>
                                                        <a href={`/user/${item.id}`}>
                                                            <h4 className="fw-700 font-xss mt-3 mb-0">
                                                                {item.fullName}{" "}
                                                            </h4>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps)(React.memo(Follower));
