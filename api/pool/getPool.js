import axios from "axios"
import {process.env.SERVER_URL} from "@env";import {toast} from "@wrappers/toast";

export const getPool = async (listenerToken) => {
    try {
        const poolRes = await axios.get(`${process.env.SERVER_URL}/pool/get/`, { headers: { "x-auth-token-listener": listenerToken } });


        if (poolRes.status === 200 || poolRes.status === 303) {
            return true;
        }
    } catch (e) {
        console.log(e);
        if (e.response.status === 404) {
            toast("Nothing to show");
        }
    }
}