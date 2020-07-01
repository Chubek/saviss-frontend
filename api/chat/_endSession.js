import axios from "axios"
import {toast} from "@wrappers/toast";

export const _endSession = async (sessionId, star, thumbs) => {
    try {
        const endRes = await axios.put(`${process.env.SERVER_URL}/session/endSession`, {sessionId, star, thumbs});
        await axios.post(`${process.env.SERVER_URL}/chat/leave`, {}, {headers: {"x-session-id": sessionId}});

        if (endRes.status === 200 || endRes.status === 304) {
            toast("Session ended")
            return true;
        }
    } catch (e) {
        throw new Error((e));
    }
}