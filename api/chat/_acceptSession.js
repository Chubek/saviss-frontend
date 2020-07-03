import axios from "axios"
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";

export const _acceptSession = async (sessionId, listenerToken) => {
    if (!sessionId) {
        toast("No Session ID!");
        return false;
    }

    if (!listenerToken) {
        toast("No listener token");
        return false;
    }

    try {
        const acceptRes = await axios.put(`${Constants.manifest.extra.serverUrl}/session/acceptSession`,
            {sessionId}, {headers: {"x-auth-number-token": listenerToken}});
        await axios.post(`${Constants.manifest.extra.serverUrl}/chat/accept`, {
            headers: {
                "x-session-id": sessionId,
                "x-auth-number-token": listenerToken
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