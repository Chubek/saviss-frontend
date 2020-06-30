import axios from "axios"
import {toast} from "@wrappers/toast";

export const _register = async (userName, number, bio) => {
    if (!userName) {
        toast("Name not entered");
        return false;
    }
    if (!number) {
        toast("Number not entered");
        return false;
    }

    const pattern = / ^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$ /;
    if (pattern.test(number)) {
        toast("Number must be Indian");
    }

    if (!bio) {
        toast("Bio not entered");
        return false;
    }

    try {
        const registerRes = await axios.post(
            `${process.env.SERVER_URL}/listener/register`,
            {number, bio, userName, isTest: "true"}
        );

        if (registerRes.status === 200) {
            return true;
        }
    } catch (e) {
        if (e.response.status === 401) {
            if (e.response.data.isSame === "userName") {
                toast("Username exists!");
            } else if (e.response.data.isSame === "number") {
                toast("Number exists!");
                return false;
            } else if (e.response.data.numberNotIndian) {
                toast("Number is not Indian!");
                return false;
            }
        }
    }
}