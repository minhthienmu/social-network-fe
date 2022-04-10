import { SET_USER } from "./action";
import { AnyAction } from "redux";

interface State {
    user: any;
}

const initState: State = {
    user: {},
};

const userReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default userReducer;
