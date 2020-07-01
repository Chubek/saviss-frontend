import axios from "axios"
import {toast} from "@wrappers/toast";
import {Constants.manifest.extra.serverUrl} from "react-native-dotenv";

export const _endSession = async (sessionId, star, thumbs) => {
    try {
        const endRes = await axios.put(`${Constants.manifest.extra.serverUrl}/session/endSession`, {sessionId, star, thumbs});
        await axios.post(`${Constants.manifest.extra.serverUrl}/chat/leave`, {}, {headers: {"x-session-id": sessionId}});

        if (endRes.status === 200 || endRes.status === 304) {
            toast("Session ended")
            return true;
        }
    } catch (e) {
        throw new Error((e));
    }
}