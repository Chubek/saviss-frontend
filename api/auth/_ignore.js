import axios from "axios"
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";


export const _ignore = async (sessionId, role, token) => {

    try {
        const ignoreRes = await axios.put(`${Constants.manifest.extra.serverUrl}/user/ignore`, {
            sessionId,
            role
        }, {headers: {"x-auth-number-token": token}})

        if (ignoreRes.status === 200) {
            toast("User ignored")
            return true
        }
    } catch (e) {
        throw e;
    }

}