import { SET_NEW_MESSAGE } from "./action";
import { AnyAction } from "redux";

interface State {
    message: any;
}

const initState: State = {
    message: {},
};

const messageReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case SET_NEW_MESSAGE:
            return {
                ...state,
                message: action.message,
            };
        default:
            return state;
    }
};

export default messageReducer;
