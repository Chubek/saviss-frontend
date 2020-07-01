import axios from "axios"
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";

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
        const acceptRes = await axios.put(`${Constants.manifest.extra.serverUrl}/session/acceptSession`,
            {sessionId, listenerNumber});
        await axios.post(`${Constants.manifest.extra.serverUrl}/chat/accept`, {listenerNumber}, {
            headers: {
                "x-session-id": sessionId
            }
        });
        await axios.post(`${Constants.manifest.extra.serverUrl}/poolop/accepted/${sessionId}`);

        if (acceptRes.status === 200) {
            return true;
        }

    } catch (e) {
        throw new Error(e);
    }
}