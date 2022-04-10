import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "store";
import "./style.scss";
import { PersistGate } from "redux-persist/lib/integration/react";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>,
    document.getElementById("root"),
);
