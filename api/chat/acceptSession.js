import axios from "axios"


export const acceptSession = async (sessionId, listenerToken) => {
    if (!sessionId) {
        toast("No Session ID!");
        return false;
    }

    try {
        const acceptRes = await axios.put(`${process.env.SERVER_URL}/session/accept/${sessionId}`,
            {}, {headers: {"x-auth-token-listener": listenerToken}});
        await axios.post(`${process.env.SERVER_URL}/chat/accept`, {}, {
            headers: {
                "x-session-id": sessionId,
                "x-auth-token-listener": listenerToken
            }
        });
        await axios.post(`${process.env.SERVER_URL}/poolop/accepted/${sessionId}`);
        if (acceptRes.status === 200) {
            return true;
        }
    } catch (e) {
        throw new Error(e);
    }
}