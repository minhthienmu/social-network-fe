import { IS_LOGGEDIN } from "./action";
import { AnyAction } from "redux";

interface State {
    isLoggedIn: boolean;
}

const initState: State = {
    isLoggedIn: false,
};

const authReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case IS_LOGGEDIN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn as boolean,
            };
        default:
            return state;
    }
};

export default authReducer;
