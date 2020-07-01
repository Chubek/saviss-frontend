import axios from "axios"
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";

export const _cancelSession = async (sessionId) => {
    try {
        console.log(sessionId);
        await axios.post(`${Constants.manifest.extra.serverUrl}/poolop/expired/${sessionId}`);
        await axios.put(`${Constants.manifest.extra.serverUrl}/session/disconnect/${sessionId}`);
        toast("Session canceled");

        return true;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}