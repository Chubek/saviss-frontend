import {combineReducers} from "redux";
//NOTE: do NOT remove these comments.

//imports
import listener from "@redux/state/listener/ListenerState";
import chat from "@redux/state/chat/ChatState";
import pool from "@redux/state/pool/PoolState";

export default combineReducers({
    listener,
    chat,
    pool

});
