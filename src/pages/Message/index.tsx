import React, { Fragment } from "react";
import Leftnav from "component/LeftNav";

interface Props {}

const Message = (props: Props) => {
    return (
        <Fragment>
            <Leftnav />
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0" style={{ maxWidth: "100%" }}>
                        <div className="row">
                            <div className="col-lg-12 position-relative">
                                <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                    <div className="chat-body p-3 ">
                                        <div className="messages-content pb-5">
                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="/assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5>Tâm</h5>
                                                        {/* <div className="time">01:35 PM</div> */}
                                                    </div>
                                                </div>
                                                <div className="message-wrap">Xin chào.</div>
                                            </div>

                                            <div className="message-item outgoing-message">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="/assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5>Trần Minh Thiện</h5>
                                                        {/* <div className="time">01:35 PM</div> */}
                                                    </div>
                                                </div>
                                                <div className="message-wrap">Xin chào</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="/assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5>Tâm</h5>
                                                        {/* <div className="time">01:35 PM</div> */}
                                                    </div>
                                                </div>
                                                <div className="message-wrap">Có gì không bạn?</div>
                                            </div>

                                            <div className="message-item outgoing-message">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="/assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5>Trần Minh Thiện</h5>
                                                        {/* <div className="time">01:35 PM</div> */}
                                                    </div>
                                                </div>
                                                <div className="message-wrap">
                                                    Cho mình xin thông tin về dịch vụ bạn về sử dụng?
                                                </div>
                                            </div>

                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg"
                                    style={{ width: "98%" }}
                                >
                                    <form className="chat-form">
                                        <div className="form-group">
                                            <input type="text" placeholder="Start typing.." />
                                        </div>
                                        <button className="bg-current">
                                            <i className="ti-arrow-right text-white"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Message;
