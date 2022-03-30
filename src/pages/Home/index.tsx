import Leftnav from "component/LeftNav";
import { Posts } from "mockup/post";
import React, { Component, Fragment } from "react";
import CreatePost from "../../component/CreatePost";
import Loading from "../../component/Loading";
import PostView from "../../component/PostView";

interface Props {}

interface State {
    isLogin: boolean;
}

class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLogin: false,
        };
    }

    componentDidMount() {
        const { isLogin } = this.state;
    }

    render() {
        return (
            <Fragment>
                <Leftnav />
                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row feed-body">
                                <div className="col-xl-10 col-xxl-10 col-lg-10">
                                    <CreatePost />
                                    {Posts.map((post) => {
                                        return (
                                            <PostView
                                                id={post.id}
                                                key={post.id}
                                                postVideo={post.postVideo}
                                                postImage={post.postImage}
                                                avatar={post.avatar}
                                                user={post.user}
                                                time={post.time}
                                                content={post.content}
                                            />
                                        );
                                    })}
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
}

export default Home;
