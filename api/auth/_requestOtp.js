import axios from "axios";
import Constants from "expo-constants";
import {toast} from "@wrappers/toast";

export const _requestOtp = async (number, pushToken) => {
    if (!number) {
        toast("No number has been entered");
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
    }

}