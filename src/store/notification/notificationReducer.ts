import { SET_NEW_NOTIFICATION } from "./action";
import { AnyAction } from "redux";

interface State {
    notification: any;
}

const initState: State = {
    notification: {},
};

const notificationReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case SET_NEW_NOTIFICATION:
            return {
                ...state,
                notification: action.notification,
            };
        default:
            return state;
    }
};

export default notificationReducer;
