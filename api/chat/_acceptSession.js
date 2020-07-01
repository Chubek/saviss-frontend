import axios from "axios"
import {toast} from "@wrappers/toast";

export const _acceptSession = async (sessionId, listenerNumber) => {
    if (!sessionId) {
        toast("No Session ID!");
        return false;
    }

    if (!listenerNumber) {
        toast("No listener number");
        return false;
    }

    try {
        const acceptRes = await axios.put(`${process.env.SERVER_URL}/session/acceptSession`,
            {sessionId, listenerNumber});
        await axios.post(`${process.env.SERVER_URL}/chat/accept`, {listenerNumber}, {
            headers: {
                "x-session-id": sessionId
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