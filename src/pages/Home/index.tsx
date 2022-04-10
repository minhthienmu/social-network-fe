import React, { Fragment } from "react";
import Leftnav from "component/LeftNav";
import CreatePost from "../../component/CreatePost";
import Loading from "../../component/Loading";
import PostView from "../../component/PostView";
import { useQuery } from "@apollo/client";
import { queryAllPost } from "graphql/query";

interface Props {}

const Home = (props: Props) => {
    //const [allPost, setAllPost] = useState([]);
    const { loading, error, data, refetch } = useQuery(queryAllPost);
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
            postVideo: "",
            postImage: post.image,
            avatar: "user.png",
            user: post.userFullName,
            time: "",
            description: post.description,
        };
    });
    return (
        <Fragment>
            <Leftnav />
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-10 col-xxl-10 col-lg-10">
                                <CreatePost createPostSuccess={createPostSuccess} />
                                {allPost.map((post: any) => {
                                    return (
                                        <PostView
                                            id={post.id}
                                            key={post.id}
                                            postVideo={post.postVideo}
                                            postImage={post.postImage}
                                            avatar={post.avatar}
                                            user={post.user}
                                            time={post.time}
                                            description={post.description}
                                        />
                                    );
                                })}
                            </div>
                            <div className="col-xl-2 col-xxl-2col-lg-2 ps-lg-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
