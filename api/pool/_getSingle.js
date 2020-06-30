import axios from "axios";
import {toast} from "@wrappers/toast";

export const _getSingle = async (sessionId, listenerToken) => {
    try {
        const poolRes = await axios.get(`${process.env.SERVER_URL}/pool/single/${sessionId}`, {headers: {"x-auth-token-listener": listenerToken}});

        if (poolRes.status === 200 || poolRes.status === 304) {
            return poolRes.data.poolSingle;
        }

    } catch (e) {
        throw e;
    }
}