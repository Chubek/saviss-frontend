import axios from "axios"

export const sendMessage = async (message, sessionId) => {
    try {
        const sendRes = await axios.post(`${process.env.SERVER_URL}/chat/sendMessage`, {
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