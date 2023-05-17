import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authreducer";
import chatReducer from "./chatreducer";

let reducers = combineReducers({
    auth: authReducer,
    chat: chatReducer
    
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;

