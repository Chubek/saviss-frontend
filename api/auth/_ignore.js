import axios from "axios"
import {toast} from "@wrappers/toast";


export const _ignore = async (sessionId, role, number) => {

    try {
        const ignoreRes = await axios.put(`${process.env.SERVER_URL}/user/ignore`, {sessionId, role, number})

        if (ignoreRes.status === 200) {
            toast("User ignored")
            return true
        }
    } catch (e) {
        throw e;
    }

}