import axios from "axios"
import Constants from "expo-constants";

export const _sendMessage = async (message, sessionId) => {
    try {
        const sendRes = await axios.post(`${Constants.manifest.extra.serverUrl}/chat/sendMessage`, {
            data: JSON.stringify(message)
        }, {headers: {"x-session-id": sessionId}});

        if (sendRes.status === 200 || sendRes.status === 304) {
            return true;
        }

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}