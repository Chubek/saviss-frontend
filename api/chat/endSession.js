import axios from "axios"
import SERVER_URL from "@root/globalStr.env";

export const endSession = async (sessionId) => {
    try {
        const endRes = await axios.put(`${SERVER_URL}/session/disconnect/${sessionId}`);
        await axios.post(`${SERVER_URL}/chat/leave`, {}, {headers: {"x-session-id": sessionId}});

        if (endRes.status === 200 || endRes.status === 304) {
            return true;
        }
    } catch (e) {
        throw new Error((e));
    }
}