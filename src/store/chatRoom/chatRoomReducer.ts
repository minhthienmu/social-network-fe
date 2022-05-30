import { SET_NEW_CHAT_ROOM } from "./action";
import { AnyAction } from "redux";

interface State {
    chatroom: any;
}

const initState: State = {
    chatroom: {},
};

const chatRoomReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case SET_NEW_CHAT_ROOM:
            return {
                ...state,
                chatroom: action.chatroom,
            };
        default:
            return state;
    }
};

export default chatRoomReducer;
