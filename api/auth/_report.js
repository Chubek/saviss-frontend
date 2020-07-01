import axios from "axios";
import {toast} from "@wrappers/toast";


export const _report = async (sessionId, reporter, reportReason) => {
    try {
        const reportRes = await axios.put(`${process.env.SERVER_URL}/session/report/${sessionId}`, {
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