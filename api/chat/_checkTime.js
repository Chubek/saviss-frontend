import axios from "axios"
import moment from "moment";
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";

export const _checkTime = async (startTime, sessionId) => {
    const now = moment();

    if (now.diff(startTime, "minutes") > 3) {
        toast("Session expired");
        await axios.post(`${Constants.manifest.extra.serverUrl}/poolop/expired/${sessionId}`);
        return false;
    }
};
