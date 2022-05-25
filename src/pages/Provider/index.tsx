import { useLazyQuery } from "@apollo/client";
import CoverImageProvider from "component/CoverImageProvider";
//import CreatePost from "component/CreatePost";
import PostView from "component/PostView";
import { queryAllPost, queryProviderInfo } from "graphql/query";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";
import { RootState } from "store";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends RouteComponentProps, ReturnType<typeof mapStateToProps> {}

const Provider = (props: Props) => {
    const { id } = useParams<{ id: string }>();
    const { user } = props;
    const [getProviderInfo] = useLazyQuery(queryProviderInfo);
    const [getAllPostByProvider] = useLazyQuery(queryAllPost);
    const [providerInfo, setProviderInfo] = useState<any>({});
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const resProviderInfoPromise = getProviderInfo({
                variables: {
                    providerInfoId: id,
                },
            });
            const resGetAllPostPromise = getAllPostByProvider({
                variables: {
                    request: {
                        currentUserId: user.id,
                        last: 0,
                        providerId: id,
                    },
                },
            });
            const resProviderInfo = await resProviderInfoPromise;
            const resGetAllPost = await resGetAllPostPromise;
            const allPost: any = resGetAllPost.data.allPost.map((post: any) => {
                return {
                    id: post.id,
                    userId: post.userId,
                    providerId: post.providerId,
                    providerName: post.providerName,
                    serviceId: post.serviceId,
                    serviceName: post.serviceName,
                    postVideo: "",
                    postImage: post.image,
                    avatar: post.avatar ?? "user.png",
                    user: post.userFullName,
                    time: "",
                    description: post.description,
                    rate: post.rate,
                    numLikes: post.numLikes ?? 0,
                    numComments: post.numComments ?? 0,
                    isLikeByUser: post.isLikeByUser,
                };
            });
            setProviderInfo(resProviderInfo.data.providerInfo);
            setPosts(allPost);
        })();
    }, []);

    const createPostSuccess = async () => {
        const res = await getAllPostByProvider({
            variables: {
                request: {
                    currentUserId: user.id,
                    last: 0,
                    providerId: id,
                },
            },
        });
        const allPost: any = res.data.allPost.map((post: any) => {
            return {
                id: post.id,
                userId: post.userId,
                providerId: post.providerId,
                providerName: post.providerName,
                serviceId: post.serviceId,
                serviceName: post.serviceName,
                postImage: post.image,
                avatar: post.avatar ?? "user.png",
                user: post.userFullName,
                time: "",
                description: post.description,
                rate: post.rate,
                numLikes: post.numLikes ?? 0,
                numComments: post.numComments ?? 0,
                isLikeByUser: post.isLikeByUser,
            };
        });
        setPosts(allPost);
    };

    return (
        <Fragment>
            <div className="main-content right-chat-active" style={{ paddingLeft: "200px", paddingRight: "200px" }}>
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                <CoverImageProvider
                                    name={providerInfo.name}
                                    address={providerInfo.address}
                                    serviceRate={providerInfo.serviceRate}
                                />
                            </div>
                            {/* <a href="/" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3">
                                <i className="feather-filter font-xss text-grey-500"></i>
                            </a> */}
                            <div className="col-xl-12 col-xxl-12 col-lg-12">
                                {/* <CreatePost createPostSuccess={createPostSuccess} /> */}
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
                                            postImage={post.postImage}
                                            avatar={post.avatar}
                                            userFullName={post.user}
                                            time={post.time}
                                            description={post.description}
                                            rate={post.rate}
                                            numLikes={post.numLikes}
                                            numComments={post.numComments}
                                            isLikeByUser={post.isLikeByUser}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps)(React.memo(Provider));
