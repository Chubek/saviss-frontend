import axios from "axios"
import {ToastAndroid} from "react-native"
import SERVER_URL from "@root/globalStr.env";

const login = async (number, otp) => {
    try {
        if (!number) {
            ToastAndroid.showWithGravity(
                "Number hasn't been entered",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

            return false;
        }

        if (!otp) {
            ToastAndroid.showWithGravity(
                "OTP hasn't been entered",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

            return false;
        }

        const authRes = await axios.post(`${SERVER_URL}/listener/auth`, {
            number,
            password: otp
        });


        if (authRes.status === 200) {
            return authRes.data.token;
        }
    } catch (e) {
        if (e.response.status === 401) {
            if (e.response.data.notSent === "loginString") {
                ToastAndroid.showWithGravity(
                    "Number not sent!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                return false;
            } else if (e.response.data.notSent === "password") {
                ToastAndroid.showWithGravity(
                    "OTP not sent!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                return false;
            }
        } else if (e.response.status === 404) {
            if (!e.response.data.isUser) {
                ToastAndroid.showWithGravity(
                    "No such user!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                return false;
            }
        } else if (e.response.status === 500) {
            ToastAndroid.showWithGravity(
                "OTP expired!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
    }

}