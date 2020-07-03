import axios from "axios";
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";

export const _getPool = async (userToken) => {
    try {
        const poolRes = await axios.get(
            `${Constants.manifest.extra.serverUrl}/pool/get/`,
            {headers: {"x-auth-token-number-token": userToken}}
        );

        if (poolRes.status === 200) {
            return poolRes.data.pool;
        }

        if (poolRes.status === 304) {
            toast("Nothing new to show!");
            return poolRes.data.pool;
        }

    } catch (e) {
        if (e.response.status === 404) {
            toast("Nothing to show");
        }
        toast("Sorry something went wrong");

        // throw e;
    }
};