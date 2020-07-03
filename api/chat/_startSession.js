import axios from "axios"

import {toast} from "@wrappers/toast";
import Constants from "expo-constants";


export const _startSession = async (seekerToken, seekerReason) => {
    if (!seekerToken) {
        toast("Number not entered");
        return false;
    }

    if (!seekerReason) {
        toast("Reason not entered");
        return false;
    }

    try {
        const sessionRes = await axios.post(`${Constants.manifest.extra.serverUrl}/session/startSession`,
            {seekerReason},
            {headers: {"x-auth-number": seekerToken}});

        if (sessionRes.status === 200) {
            await axios.post(`${Constants.manifest.extra.serverUrl}/poolop/entered/${sessionRes.data.sessionId}`);
            return sessionRes.data.sessionId;
        }


        return false;

    } catch (e) {
        throw new Error(e);
    }
}