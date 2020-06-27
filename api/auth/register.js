import axios from "axios"
import {ToastAndroid} from "react-native"
import SERVER_URL from "@root/globalStr.env";

const register = async (userName, number, bio) => {
    if (!userName) {
        ToastAndroid.showWithGravity(
            "Name not entered",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        return false;
    }
    if (!number) {
        ToastAndroid.showWithGravity(
            "Number not entered",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        return false;
    }

    const pattern = / ^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$ /;
    if (pattern.test(number)) {
        ToastAndroid.showWithGravity(
            "Number must be Indian",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    if (!bio) {
        ToastAndroid.showWithGravity(
            "Bio not entered",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        return false;
    }

    try {
        const registerRes = await axios.post(
            `${SERVER_URL}/listener/register`,
            {number, bio, userName, isTest: "true"}
        );

        if (registerRes.status === 200) {
            return true;
        }
    } catch (e) {
        if (e.response.status === 401) {
            console.log(e.response);
            if (e.response.data.isSame === "userName") {
                ToastAndroid.showWithGravity(
                    "Username exists!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            } else if (e.response.data.isSame === "number") {
                ToastAndroid.showWithGravity(
                    "Number exists!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                return false;
            } else if (e.response.data.numberNotIndian) {
                ToastAndroid.showWithGravity(
                    "Number is not Indian!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                return false;
            }
        }
    }
}