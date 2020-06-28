import axios from "axios"
import moment from "moment";
import {toast} from "@wrappers/toast";

export const checkTime = async (startTime, sessionId) => {
    const now = moment();

    if (now.diff(startTime, "minutes") > 3) {
        toast("Session expired");
        await axios.post(`${process.env.SERVER_URL}/poolop/expired/${sessionId}`);
        return false;
    }
};
