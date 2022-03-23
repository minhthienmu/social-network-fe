import Leftnav from "component/LeftNav";
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
                                <div className="col-xl-8 col-xxl-9 col-lg-8">
                                    <CreatePost />
                                    <PostView
                                        id={32}
                                        postVideo=""
                                        postImage="post.png"
                                        avatar="user.png"
                                        user="A"
                                        time="22 min ago"
                                        content="Tháng 9 – Tháng 10 luôn được xem là thời điểm đẹp nhất để chúng ta thực hiện những chuyến hành trình đến với những cung đường Tây Bắc và Đông Bắc của Việt Nam. Ghiền review đã từng đặt chân đến những vùng đất này và thật sự mình bị choáng ngợp trước vẻ đẹp của cảnh sắc, núi sông và con người nơi đây. Trong bài review này, mình sẽ chia sẻ với các bạn kinh nghiệm phượt cung Đông Bắc trong 9 ngày 9 đêm mà mình cùng với những người bạn vừa mới thực hiện trong mấy ngày vừa qua. Điểm đặc biệt trong hành trình này là chúng mình khám phá được rất nhiều nơi với chi phí siêu tiết kiệm luôn. Nào, hãy cùng tìm hiểu với Ghiền review ngay và luôn các bạn nhé."
                                    />
                                    <PostView
                                        id={31}
                                        postVideo=""
                                        postImage="post.png"
                                        avatar="user.png"
                                        user="A"
                                        time="22 min ago"
                                        content="Tháng 9 – Tháng 10 luôn được xem là thời điểm đẹp nhất để chúng ta thực hiện những chuyến hành trình đến với những cung đường Tây Bắc và Đông Bắc của Việt Nam. Ghiền review đã từng đặt chân đến những vùng đất này và thật sự mình bị choáng ngợp trước vẻ đẹp của cảnh sắc, núi sông và con người nơi đây. Trong bài review này, mình sẽ chia sẻ với các bạn kinh nghiệm phượt cung Đông Bắc trong 9 ngày 9 đêm mà mình cùng với những người bạn vừa mới thực hiện trong mấy ngày vừa qua. Điểm đặc biệt trong hành trình này là chúng mình khám phá được rất nhiều nơi với chi phí siêu tiết kiệm luôn. Nào, hãy cùng tìm hiểu với Ghiền review ngay và luôn các bạn nhé."
                                    />
                                    <PostView
                                        id={33}
                                        postVideo=""
                                        postImage="post.png"
                                        avatar="user.png"
                                        user="A"
                                        time="2 hour ago"
                                        content="Tháng 9 – Tháng 10 luôn được xem là thời điểm đẹp nhất để chúng ta thực hiện những chuyến hành trình đến với những cung đường Tây Bắc và Đông Bắc của Việt Nam. Ghiền review đã từng đặt chân đến những vùng đất này và thật sự mình bị choáng ngợp trước vẻ đẹp của cảnh sắc, núi sông và con người nơi đây. Trong bài review này, mình sẽ chia sẻ với các bạn kinh nghiệm phượt cung Đông Bắc trong 9 ngày 9 đêm mà mình cùng với những người bạn vừa mới thực hiện trong mấy ngày vừa qua. Điểm đặc biệt trong hành trình này là chúng mình khám phá được rất nhiều nơi với chi phí siêu tiết kiệm luôn. Nào, hãy cùng tìm hiểu với Ghiền review ngay và luôn các bạn nhé."
                                    />
                                    <Loading />
                                </div>
                                <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;
