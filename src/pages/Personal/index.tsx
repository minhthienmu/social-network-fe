import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import CoverImage from "component/CoverImage";
import CreatePost from "component/CreatePost";
import Loading from "component/Loading";
import PostView from "component/PostView";
import { followMutation, unfollowMutation } from "graphql/mutation";
import { queryAllPost, queryIsFollowing, queryUserInfo } from "graphql/query";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";
import { RootState } from "store";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { setNewChatRoom } from "store/chatRoom/action";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            setNewChatRoom,
        },
        dispatch,
    );

interface Props
    extends RouteComponentProps,
        ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps> {}

const Personal = (props: Props) => {
    const { id } = useParams<{ id: string }>();
    const { user } = props;
    const [itsMe, setItsMe] = useState(false);
    const { loading, data, refetch } = useQuery(queryAllPost, {
        variables: {
            request: {
                currentUserId: user.id,
                last: 0,
                userId: id,
            },
        },
    });
    const [getUserInfo] = useLazyQuery(queryUserInfo);
    const [getIsFollowing] = useLazyQuery(queryIsFollowing);
    const [follow] = useMutation(followMutation);
    const [unfollow] = useMutation(unfollowMutation);
    const [userInfo, setUserInfo] = useState<any>({});
    const [isFollowed, setIsFollowed] = useState<boolean>(false);

    const createPostSuccess = () => {
        refetch();
    };

    useEffect(() => {
        (async () => {
            const userInfoPromise = getUserInfo({
                variables: {
                    userId: id,
                },
            });
            if (user.id === id) {
                setItsMe(true);
            } else {
                const isFollowingPromise = getIsFollowing({
                    variables: {
                        followerId: user.id,
                        followingId: id,
                    },
                });
                const resIsFollowing = await isFollowingPromise;
                const isFollowing = resIsFollowing.data.isFollowing === "true" ? true : false;
                setIsFollowed(isFollowing);
            }
            const resUserInfo = await userInfoPromise;
            setUserInfo(resUserInfo.data.user);
        })();
    }, []);

    const onFollow = async () => {
        await follow({
            variables: {
                followerId: user.id,
                followingId: id,
            },
        });
        setIsFollowed(!isFollowed);
    };

    const onUnfollow = async () => {
        await unfollow({
            variables: {
                unfollowerId: user.id,
                followingId: id,
            },
        });
        setIsFollowed(!isFollowed);
    };

    const onMessage = async () => {
        props.setNewChatRoom({
            id: null,
            userId: id,
            name: userInfo.fullName,
            avatar: userInfo.avatar,
        });
        window.location.href = "/message";
    };

    if (loading) {
        return (
            <Fragment>
                <div className="main-content right-chat-active" style={{ paddingLeft: "200px", paddingRight: "200px" }}>
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12 mb-3">
                                    <CoverImage
                                        userFullName={userInfo.fullName}
                                        birthday={userInfo.birthday}
                                        phoneNumber={userInfo.phoneNumber}
                                        itsMe={itsMe}
                                        follow={onFollow}
                                        unfollow={onUnfollow}
                                        isFollowed={isFollowed}
                                    />
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
            isLikeByUser: post.isLikeByUser,
        };
    });

    return (
        <Fragment>
            <div className="main-content right-chat-active" style={{ paddingLeft: "200px", paddingRight: "200px" }}>
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                <CoverImage
                                    userFullName={userInfo.fullName}
                                    birthday={userInfo.birthday}
                                    phoneNumber={userInfo.phoneNumber}
                                    itsMe={itsMe}
                                    follow={onFollow}
                                    unfollow={onUnfollow}
                                    isFollowed={isFollowed}
                                    onMessage={onMessage}
                                />
                            </div>
                            {/* <a href="/" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3">
                                <i className="feather-filter font-xss text-grey-500"></i>
                            </a> */}
                            <div className="col-xl-12 col-xxl-12 col-lg-12">
                                {itsMe ? (
                                    <>
                                        <CreatePost createPostSuccess={createPostSuccess} />
                                    </>
                                ) : null}
                                {allPost.map((post: any) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Personal));
