import axios from "axios"

import {toast} from "@wrappers/toast";


export const startSession = async (seekerNumber, seekerReason) => {
    if (!seekerNumber) {
        toast("Number not entered");
        return false;
    }

    if (!seekerReason) {
        toast("Reason not entered");
        return false;
    }

    try {
        const sessionRes = await axios.post(`${process.env.SERVER_URL}/session/createSession`, {seekerNumber, seekerReason});

        if (sessionRes.status === 200) {
            await axios.post(`${process.env.SERVER_URL}/poolop/entered/${sessionRes.data.sessionId}`);
            return sessionRes.data.sessionId;
        }


        return false;

    } catch (e) {
        throw new Error(e);
    }
}