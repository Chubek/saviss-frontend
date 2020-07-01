import axios from "axios"
import {toast} from "@wrappers/toast";

export const _logIn = async (number, otp) => {
    try {
        if (!number) {
            toast("Number hasn't been entered");

            return false;
        }

        if (!otp) {
            toast("OTP hasn't been entered")

            return false;
        }

        const authRes = await axios.post(`${process.env.SERVER_URL}/user/auth`, {
            number,
            otp
        });


        if (authRes.status === 200) {
            return number;
        }

    } catch (e) {
        if (e.response.status === 404) {
            toast("Number not found");
        }
        if (e.response.status === 401) {
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