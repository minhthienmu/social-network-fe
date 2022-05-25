import React, { Fragment, useEffect } from "react";
import Leftnav from "component/LeftNav";
import CreatePost from "../../component/CreatePost";
import Loading from "../../component/Loading";
import PostView from "../../component/PostView";
import { useQuery } from "@apollo/client";
import { queryAllPost } from "graphql/query";
import { RootState } from "store";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends ReturnType<typeof mapStateToProps> {}

const Home = (props: Props) => {
    //const [allPost, setAllPost] = useState([]);
    const { user } = props;
    const { loading, error, data, refetch } = useQuery(queryAllPost, {
        variables: {
            request: {
                currentUserId: user.id,
                last: 0,
            },
        },
    });

    useEffect(() => {
        refetch();
    }, []);

    const createPostSuccess = () => {
        refetch();
    };

    if (loading) {
        return (
            <Fragment>
                <Leftnav />
                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row feed-body">
                                <div className="col-xl-10 col-xxl-10 col-lg-10">
                                    <CreatePost createPostSuccess={createPostSuccess} />
                                    <Loading />
                                </div>
                                <div className="col-xl-2 col-xxl-2col-lg-2 ps-lg-0"></div>
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

    return (
        <Fragment>
            <Leftnav />
            <div className="main-content bg-lightblue2 right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-8 col-xxl-9 col-lg-9">
                                <CreatePost createPostSuccess={createPostSuccess} />
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
                            <div className="col-xl-4 col-xxl-3 col-lg-3 ps-lg-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps)(Home);
