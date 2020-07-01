import axios from "axios";
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";


export const _report = async (sessionId, reporter, reportReason) => {
    try {
        const reportRes = await axios.put(`${Constants.manifest.extra.serverUrl}/session/report/${sessionId}`, {
            reporter,
            reportReason
        })

        if (reportRes.status === 200) {
            toast("Reported");
            return true;
        }
    } catch (e) {
        throw e;
    }
}