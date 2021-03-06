import axios from "axios"
import {toast} from "@wrappers/toast";
import Constants from "expo-constants";

export const _logIn = async (number, otp) => {
    try {
        if (!number) {
            toast("Number hasn't been entered");
            return false;
        }

        if (!otp) {
            toast("OTP hasn't been entered");
            return false;
        }

        const authRes = await axios.post(`${Constants.manifest.extra.serverUrl}/user/auth`, {
            number,
            otp
        });


        if (authRes.status === 200) {
            return authRes.data.token;
        }

    } catch (e) {
        if (e.response.status === 404) {
            toast("Number not found");
        }
        if (e.response.status === 401) {
            toast("OTP expired!")
            throw new Error("OTPEXPIRED");
        }
        if (e.response.status === 403) {
            throw new Error("OTPINCORRECT");
        }
        if (e.response.status === 407) {
            toast("You are banned!");
            throw new Error("USERBANNED")
        }
    }

}