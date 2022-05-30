import React, { useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import { connect } from "react-redux";
import { RootState } from "store";
import InfiniteScroll from "react-infinite-scroller";
import { useLazyQuery, useMutation } from "@apollo/client";
import { queryMessage } from "graphql/query";
import { convertDateToTime } from "utils/utils";
import { sendMessageMutation } from "graphql/mutation";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
        message: state.messageReducer.message,
    };
};

interface Props extends ReturnType<typeof mapStateToProps> {
    chatRoom: any;
    sendMessage: (chatRoomId: any) => void;
}

//const last = 20;

const MessageBox = (props: Props) => {
    const { chatRoom, user, message } = props;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [queryMessages] = useLazyQuery(queryMessage);
    const [sendMessage] = useMutation(sendMessageMutation);
    const [listMessage, setListMessage] = useState<any>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        (async () => {
            if (chatRoom?.id) {
                const messages = await getMessages();
                setListMessage(messages);
            }
        })();
    }, [chatRoom.id]);

    useEffect(() => {
        scrollToBottom();
    }, [listMessage]);

    useEffect(() => {
        if (message?.id && message?.chatRoomId === chatRoom.id) {
            const newListMessage = [...listMessage];
            newListMessage.push({
                id: message.id,
                userId: chatRoom.userId,
                avatar: chatRoom.avatar ? chatRoom.avatar : "user.png",
                name: chatRoom.name,
                time: convertDateToTime(message.date),
                message: message.message,
                itsme: false,
            });
            setListMessage(newListMessage);
        }
    }, [message.id]);

    const getMessages = async () => {
        const res = await queryMessages({
            variables: {
                chatRoomId: chatRoom.id,
            },
        });
        return handleMessage(res.data.message);
    };

    const handleMessage = (messages: any[]) => {
        const result: any[] = [];
        messages.forEach((item: any) => {
            if (item.from === user.id) {
                result.push({
                    id: item.id,
                    userId: user.id,
                    avatar: user.avatar ? user.avatar : "user.png",
                    name: user.fullName,
                    time: convertDateToTime(item.date),
                    message: item.message,
                    itsme: true,
                });
            } else {
                result.push({
                    id: item.id,
                    userId: chatRoom.userId,
                    avatar: chatRoom.avatar ? chatRoom.avatar : "user.png",
                    name: chatRoom.name,
                    time: convertDateToTime(item.date),
                    message: item.message,
                    itsme: false,
                });
            }
        });

        return result;
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const inputMessage = e.target.querySelector(`[name="input-message"]`).value;
        if (inputMessage) {
            const newListMessage = [...listMessage];
            newListMessage.push({
                id: String(Math.random()),
                userId: user.id,
                avatar: user.avatar ? user.avatar : "user.png",
                name: user.fullName,
                time: convertDateToTime(),
                message: inputMessage,
                itsme: true,
            });
            (document.querySelector(`input[name="input-message"]`) as HTMLInputElement).value = "";
            setListMessage(newListMessage);
            const res = await sendMessage({
                variables: {
                    request: {
                        id: chatRoom?.id,
                        from: user.id,
                        to: chatRoom.userId,
                        message: inputMessage,
                    },
                },
            });
            //Get new Chatroom ID and send message callback
            const newChatRoomId = res.data?.sendMessage;
            if (newChatRoomId) {
                props.sendMessage(newChatRoomId);
            }
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const loadFunc = async () => {
        //TODO: loadFunc
    };

    return (
        <>
            {" "}
            <div className="chat-wrapper rounded-xxl pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg col-md-4 col-sm-6 pe-2 ps-2">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={false}
                    loader={
                        <div className="card text-center no-border pt-lg-2">
                            <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                <div className="stage">
                                    <div className="dot-typing"></div>
                                </div>
                            </div>
                        </div>
                    }
                    useWindow={false}
                    isReverse={true}
                >
                    <div className="chat-body p-3 ">
                        <div className="messages-content pb-5">
                            {" "}
                            {listMessage.map((item: any) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`message-item ${item.itsme ? "outgoing-message" : ""}`}
                                    >
                                        <div className="message-user">
                                            <figure className="avatar">
                                                <img src={`/assets/images/${item.avatar}`} alt="avater" />
                                            </figure>
                                            <div>
                                                <a href={`/user/${item.userId}`}>
                                                    <h5>{item.name}</h5>
                                                </a>
                                                <div className="time">{item.time}</div>
                                            </div>
                                        </div>
                                        <div className="message-wrap">{item.message}</div>
                                    </div>
                                );
                            })}
                            <div className="clearfix" ref={messagesEndRef}></div>
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
            <div className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg" style={{ width: "98%" }}>
                <form className="chat-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Start typing.." name="input-message" />
                    </div>
                    <button className="bg-current">
                        <i className="ti-arrow-right text-white"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

export default connect(mapStateToProps)(React.memo(MessageBox, isEqual));
