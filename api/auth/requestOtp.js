import axios from "axios"
import SERVER_URL from "@root/globalStr.env";
import {toast} from "@wrappers/toast";

export const requestOtp = async (number) => {
    if (!number) {
        toast("No number has been entered");
    }

    try {
        const otpRes = await axios.put(
            `${SERVER_URL}/listener/request/otp`,
            {number, isTest: "true"}
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
            toast("Number not found");
            return false;
        }
    }

}