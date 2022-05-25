import { useLazyQuery } from "@apollo/client";
import Loading from "component/Loading";
import PostView from "component/PostView";
import TabTitle from "component/TabTitle";
import { querySearch } from "graphql/query";
import React, { Fragment, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const Search = (props: Props) => {
    const keyword = new URLSearchParams(props.location.search).get("q");
    const [search] = useLazyQuery(querySearch);
    const [tab, setTab] = useState("User");
    const [users, setUsers] = useState<any[]>([]);
    const [providers, setProviders] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await search({
                variables: {
                    keyword: keyword,
                },
            });
            setLoading(false);
            setUsers(res.data.search.user);
            setProviders(res.data.search.provider);
            setPosts(res.data.search.post);
            checkValueTab(res.data.search.user.length, res.data.search.provider.length, res.data.search.post.length);
        })();
    }, []);

    const changeTab = (key: string) => {
        if (key !== tab) setTab(key);
    };

    const checkValueTab = (userLength: number, providerLength: number, postLength: number) => {
        if (userLength > 0) {
            setTab("User");
            return;
        }
        if (providerLength > 0) {
            setTab("Provider");
            return;
        }
        if (postLength > 0) {
            setTab("Post");
            return;
        }
    };

    const loadTab = () => {
        switch (tab) {
            case "User":
                return (
                    <>
                        {users.map((item: any) => {
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
                                                <h4 className="fw-700 font-xss mt-3 mb-0">{item.fullName} </h4>
                                            </a>
                                            {/* <a
                                                href="#follow"
                                                className="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                                            >
                                                FOLLOW
                                            </a> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                );
            case "Provider":
                return (
                    <>
                        {providers.map((item: any) => {
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
                                                <h4 className="fw-700 font-xss mt-3 mb-0">{item.name} </h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                );
            case "Post":
                return (
                    <>
                        <div className="col-xl-12">
                            {posts.map((post: any) => {
                                return (
                                    <PostView
                                        id={post.id}
                                        userId={post.userId}
                                        providerId={post.providerId}
                                        providerName={post.providerName}
                                        serviceId={post.serviceId}
                                        serviceName={post.serviceName}
                                        key={post.id}
                                        postImage={post.image}
                                        avatar={"user.png"}
                                        userFullName={post.userFullName}
                                        time={post.time}
                                        description={post.description}
                                        rate={post.rate}
                                        numLikes={post.numLikes}
                                        numComments={post.numComments}
                                        disableReaction={true}
                                    />
                                );
                            })}
                        </div>
                    </>
                );
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
                                <TabTitle title={tab} />
                                {loading ? <Loading /> : <div className="row ps-2 pe-1">{loadTab()}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Search;
