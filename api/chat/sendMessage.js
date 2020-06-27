import axios from "axios"
import SERVER_URL from "@root/globalStr.env";


export const sendMessage = async (message, sessionId) => {
    try {
        const sendRes = await axios.post(`${SERVER_URL}/chat/sendMessage`, {
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