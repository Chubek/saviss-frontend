import axios from "axios"
import SERVER_URL from "@root/globalStr.env";
import {toast} from "@wrappers/toast";

export const login = async (number, otp) => {
    try {
        if (!number) {
            toast("Number hasn't been entered");

            return false;
        }

        if (!otp) {
            toast("OTP hasn't been entered")

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
                toast("Number not sent!");
                return false;
            } else if (e.response.data.notSent === "password") {
                toast("OTP not sent!");
                return false;
            }
        } else if (e.response.status === 404) {
            if (!e.response.data.isUser) {
                toast("No such user!");
                return false;
            }
        } else if (e.response.status === 500) {
            toast("OTP expired!");
            return false;
        } else if (e.response.status === 403) {
            throw new Error("OTPINCORRECT")
        }
    }

}