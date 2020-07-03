import axios from "axios";
import Constants from "expo-constants";
import {toast} from "@wrappers/toast";

export const _requestOtp = async (number, pushToken) => {
    if (!number) {
        toast("No number has been entered");
        return false;
    }

    const pattern = /^\+*(\d{3})*[0-9,\-]{8,}/;

    if (!pattern.test(number)) {
        toast("Use plus for country code, not double Os!");
        return false;
    }

    try {
        const otpRes = await axios.put(
            `${Constants.manifest.extra.serverUrl}/user/requestOtp`,
            {number, isTest: "true", pushToken}
            //change "true" to "false" in production
        );

        const otpSent = otpRes.data;

        if (!otpSent) {
            toast("OTP send error");
            return false;
        }

        return true;

    } catch (e) {
        if (e.response.status === 404) {
            toast("Number not found")
        }
        if (/^5\d{2}$/.test(e.response.status.toString())) {
            toast("Server Error");
        }
    }

}