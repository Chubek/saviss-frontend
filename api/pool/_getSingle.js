import axios from "axios";
import Constants from "expo-constants";

export const _getSingle = async (sessionId, userToken) => {
    try {
        const poolRes = await axios.get(`${Constants.manifest.extra.serverUrl}/pool/single/${sessionId}`, {headers: {"x-auth-token-number-token": userToken}});

        if (poolRes.status === 200 || poolRes.status === 304) {
            return poolRes.data.poolSingle;
        }

    } catch (e) {
        throw e;
    }
}