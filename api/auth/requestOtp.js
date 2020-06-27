import axios from "axios"
import {ToastAndroid} from "react-native"
import SERVER_URL from "@root/globalStr.env";

const requestOtp = async (number) => {
    if (!number) {
        ToastAndroid.showWithGravity("No number has been entered", ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    try {
        const otpRes = await axios.put(
            `${SERVER_URL}/listener/request/otp`,
            {number, isTest: "true"}
            //change "true" to "false" in production
        );

        const otpSent = otpRes.data;

        if (!otpSent) {
            ToastAndroid.showWithGravity(
                "OTP send error",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }

        return true;

    } catch (e) {
        if (e.response.status === 404) {
            ToastAndroid.showWithGravity("Number not found", ToastAndroid.SHORT, ToastAndroid.CENTER);
            return false;
        }
    }

}