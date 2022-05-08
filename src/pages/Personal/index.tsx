import { useLazyQuery, useQuery } from "@apollo/client";
import CoverImage from "component/CoverImage";
import CreatePost from "component/CreatePost";
import Loading from "component/Loading";
import PostView from "component/PostView";
import { queryAllPost, queryIsUserOrProvider, queryProviderInfo } from "graphql/query";
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

const Personal = (props: Props) => {
    const [getIsUserOrProvider] = useLazyQuery(queryIsUserOrProvider);
    const [getProviderInfo] = useLazyQuery(queryProviderInfo);
    const [isUserOrProvider, setIsUserOrProvider] = useState<string>("0");
    const [providerInfo, setProviderInfo] = useState<any>({});
    const userOrProviderId = location.pathname.split("/")[1];
    const { user } = props;
    const [itsMe, setItsMe] = useState(false);
    const { loading, error, data, refetch } = useQuery(queryAllPost, {
        variables: {
            last: 0,
        },
    });

    const createPostSuccess = () => {
        refetch();
    };

    useEffect(() => {
        (async () => {
            const res = await getIsUserOrProvider({
                variables: {
                    isUserOrProviderId: userOrProviderId,
                },
            });
            const isUserOrProvider = res.data.isUserOrProvider;
            switch (isUserOrProvider) {
                case "1":
                    if (user.id === userOrProviderId) setItsMe(true);
                    break;
                case "2":
                    const resProviderInfo = await getProviderInfo({
                        variables: {
                            providerInfoId: userOrProviderId,
                        },
                    });
                    setProviderInfo(resProviderInfo.data.providerInfo);
                    break;
            }
            setIsUserOrProvider(isUserOrProvider);
        })();
    }, []);

    if (loading) {
        return (
            <Fragment>
                <div className="main-content right-chat-active" style={{ paddingLeft: "200px", paddingRight: "200px" }}>
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12 mb-3">
                                    {isUserOrProvider === "1" ? (
                                        itsMe ? (
                                            <CoverImage userFullName={user.fullName} />
                                        ) : (
                                            <CoverImage userFullName={""} />
                                        )
                                    ) : (
                                        <CoverImage userFullName={providerInfo.name} />
                                    )}
                                </div>
                                <div className="col-xl-12 col-xxl-12 col-lg-12">
                                    {itsMe ? (
                                        <>
                                            <CreatePost createPostSuccess={createPostSuccess} />
                                            <Loading />
                                        </>
                                    ) : (
                                        <Loading />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    const allPost: any = data.allPost.map((post: any) => {
        return {
            id: post.id,
            userId: post.userId,
            providerId: post.providerId,
            providerName: post.providerName,
            serviceId: post.serviceId,
            serviceName: post.serviceName,
            postVideo: "",
            postImage: post.image,
            avatar: "user.png",
            user: post.userFullName,
            time: "",
            description: post.description,
            rate: post.rate,
            numLikes: post.numLikes ?? 0,
            numComments: post.numComments ?? 0,
            likes: post.likes ?? [],
        };
    });

    return (
        <Fragment>
            <div className="main-content right-chat-active" style={{ paddingLeft: "200px", paddingRight: "200px" }}>
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                {isUserOrProvider === "1" ? (
                                    itsMe ? (
                                        <CoverImage userFullName={user.fullName} />
                                    ) : (
                                        <CoverImage userFullName={allPost.length > 0 ? allPost[0].user : ""} />
                                    )
                                ) : (
                                    <CoverImage userFullName={providerInfo.name} />
                                )}
                            </div>
                            <div className="col-xl-12 col-xxl-12 col-lg-12">
                                {itsMe ? (
                                    <>
                                        <CreatePost createPostSuccess={createPostSuccess} />
                                    </>
                                ) : null}
                                {allPost.map((post: any) => {
                                    if (post.userId === userOrProviderId) {
                                        return (
                                            <PostView
                                                id={post.id}
                                                userId={post.userId}
                                                providerId={post.providerId}
                                                providerName={post.providerName}
                                                serviceId={post.serviceId}
                                                serviceName={post.serviceName}
                                                key={post.id}
                                                postVideo={post.postVideo}
                                                postImage={post.postImage}
                                                avatar={post.avatar}
                                                userFullName={post.user}
                                                time={post.time}
                                                description={post.description}
                                                rate={post.rate}
                                                numLikes={post.numLikes}
                                                numComments={post.numComments}
                                                likes={post.likes}
                                            />
                                        );
                                    }
                                    if (post.providerId === userOrProviderId) {
                                        return (
                                            <PostView
                                                id={post.id}
                                                userId={post.userId}
                                                providerId={post.providerId}
                                                providerName={post.providerName}
                                                serviceId={post.serviceId}
                                                serviceName={post.serviceName}
                                                key={post.id}
                                                postVideo={post.postVideo}
                                                postImage={post.postImage}
                                                avatar={post.avatar}
                                                userFullName={post.user}
                                                time={post.time}
                                                description={post.description}
                                                rate={post.rate}
                                                numLikes={post.numLikes}
                                                numComments={post.numComments}
                                                likes={post.likes}
                                            />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps)(Personal);
