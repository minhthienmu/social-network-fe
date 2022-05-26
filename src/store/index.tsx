import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authReducer";
import userReducer from "./user/userReducer";
import notificationReducer from "./notification/notificationReducer";

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    notificationReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
