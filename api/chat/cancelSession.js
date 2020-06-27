import axios from "axios"
import SERVER_URL from "@root/globalStr.env";

export const cancelSession = async (sessionId) => {
    try {
        console.log(sessionId);
        await axios.post(`${SERVER_URL}/poolop/expired/${sessionId}`);
        await axios.put(`${SERVER_URL}/session/disconnect/${getState().chat.sessionId}`);

        return true;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}