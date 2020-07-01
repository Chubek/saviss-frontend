import axios from "axios"
import {toast} from "@wrappers/toast";

export const _cancelSession = async (sessionId) => {
    try {
        console.log(sessionId);
        await axios.post(`${process.env.SERVER_URL}/poolop/expired/${sessionId}`);
        await axios.put(`${process.env.SERVER_URL}/session/disconnect/${sessionId}`);
        toast("Session canceled");

        return true;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}