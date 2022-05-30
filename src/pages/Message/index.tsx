import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import MessageBox from "./MessageBox";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { queryChatContact, queryUserInfo } from "graphql/query";
import { RootState } from "store";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { convertDateToTime } from "utils/utils";
import { messageSubscription } from "graphql/sub";
import { setNewMessage } from "store/message/action";
import { setNewChatRoom } from "store/chatRoom/action";
import isEqual from "react-fast-compare";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
        message: state.messageReducer.message,
        newChatroom: state.chatRoomReducer.chatroom,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            setNewMessage,
            setNewChatRoom,
        },
        dispatch,
    );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

const Message = (props: Props) => {
    const { user, newChatroom } = props;
    const [getChatContact] = useLazyQuery(queryChatContact);
    const [contacts, setContacts] = useState<any>([]);
    const [currentChatRoom, setCurrentChatRoom] = useState<any>(null);
    const { data: newMessageSub } = useSubscription(messageSubscription, {
        variables: {
            userId: user.id,
        },
    });
    const [getUserInfo] = useLazyQuery(queryUserInfo);

    useEffect(() => {
        (async () => {
            const res = await getChatContact({
                variables: {
                    userId: user.id,
                },
            });
            const chatContact = res.data.chatContact.map((item: any) => {
                return {
                    ...item,
                    time: convertDateToTime(item.date),
                };
            });
            if (chatContact.length > 0) {
                if (newChatroom?.userId) {
                    //route from personal -> message
                    const existChatRoom = chatContact.find((item: any) => item.userId === newChatroom.userId);
                    if (existChatRoom) {
                        //exist receiver in chatcontact
                        //set currentchatroom = receiver chat room
                        setContacts(chatContact);
                        setCurrentChatRoom({
                            id: existChatRoom.id,
                            userId: existChatRoom.userId,
                            name: existChatRoom.userFullName,
                            avatar: existChatRoom.avatar,
                        });
                    } else {
                        //unshift new receiver chatroom
                        chatContact.unshift({
                            id: null,
                            date: "",
                            time: "",
                            userId: newChatroom.userId,
                            userFullName: newChatroom.name,
                            avatar: newChatroom.avatar,
                            lastMessage: "",
                        });
                        setContacts(chatContact);
                        setCurrentChatRoom(newChatroom);
                    }
                    props.setNewChatRoom(null);
                } else {
                    setContacts(chatContact);
                    setCurrentChatRoom({
                        id: chatContact[0].id,
                        userId: chatContact[0].userId,
                        name: chatContact[0].userFullName,
                        avatar: chatContact[0].avatar,
                    });
                }
            } else {
                // Add new chatroom
                if (newChatroom?.userId) {
                    chatContact.push({
                        id: null,
                        date: "",
                        time: "",
                        userId: newChatroom.userId,
                        userFullName: newChatroom.name,
                        avatar: newChatroom.avatar,
                        lastMessage: "",
                    });
                    setContacts(chatContact);
                    setCurrentChatRoom(newChatroom);
                    props.setNewChatRoom(null);
                }
            }
        })();
    }, []);

    const changeChatRoom = (chatRoom: any) => {
        if (chatRoom.id !== currentChatRoom?.id) {
            const newChatRoom = {
                id: chatRoom.id,
                userId: chatRoom.userId,
                name: chatRoom.userFullName,
                avatar: chatRoom.avatar,
            };
            setCurrentChatRoom(newChatRoom);
        }
    };

    useEffect(() => {
        (async () => {
            if (newMessageSub?.message.id) {
                let newContacts = [...contacts];
                const message = newMessageSub.message;
                props.setNewMessage(message);
                const chatRoom = newContacts.find((item: any) => item.id === message.chatRoomId);
                if (chatRoom?.id) {
                    chatRoom.lastMessage = message.message;
                    chatRoom.time = convertDateToTime(message.date);
                    newContacts = newContacts.filter((item: any) => item.id !== chatRoom.id);
                    newContacts.unshift(chatRoom);
                    setContacts(newContacts);
                } else {
                    // handle receiver first message from other user
                    const resUser = await getUserInfo({
                        variables: {
                            userId: message.from,
                        },
                    });
                    const user = resUser.data.user;
                    newContacts.unshift({
                        id: message.chatRoomId,
                        date: message.date,
                        time: convertDateToTime(message.date),
                        userId: message.from,
                        userFullName: user.fullName,
                        avatar: user.avatar,
                        lastMessage: message.message,
                    });
                    setContacts(newContacts);
                    setCurrentChatRoom({
                        id: message.chatRoomId,
                        userId: message.from,
                        name: user.fullName,
                        avatar: user.avatar,
                    });
                }
            }
        })();
    }, [newMessageSub?.message.id]);

    const sendMessageCallback = (chatRoomId: string) => {
        const updateContacts = [...contacts];
        const chatRoom = contacts.find((item: any) => item.userId === currentChatRoom.userId);
        chatRoom.id = chatRoomId;
        setContacts(updateContacts);
        setCurrentChatRoom({
            id: chatRoom.id,
            userId: chatRoom.userId,
            name: chatRoom.userFullName,
            avatar: chatRoom.avatar,
        });
    };

    return (
        <Fragment>
            <div className="navigation" style={{ zIndex: "1", width: "400px" }}>
                <div className="container ps-0 pe-0">
                    <div
                        className="chat-wrapper p-3 position-relative scroll-bar bg-white theme-dark-bg pt-3 pb-1 mb-2 mt-2 rounded-xxl"
                        style={{ overflowX: "hidden" }}
                    >
                        <div className="nav-caption fw-600 font-xssss text-grey-500">
                            <span>Contact</span>
                        </div>
                        <ul className="email-message">
                            {contacts.map((value: any, index: number) => (
                                <li key={index}>
                                    <a
                                        className={`rounded-3 ${value.read} pointer`}
                                        onClick={() => changeChatRoom(value)}
                                    >
                                        <div className="email-user">
                                            <img src={`/assets/images/user.png`} alt="user" className="w35 me-2" />
                                            <div>
                                                <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-700">
                                                    {value.userFullName}
                                                </h6>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    {value.lastMessage}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="email-time text-grey-500 fw-600">{value.time}</div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0" style={{ maxWidth: "100%" }}>
                        <div className="row">
                            <div className="col-lg-12 position-relative">
                                {currentChatRoom?.userId ? (
                                    <MessageBox chatRoom={currentChatRoom} sendMessage={sendMessageCallback} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Message, isEqual));
