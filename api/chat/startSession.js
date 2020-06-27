import axios from "axios"
import {ToastAndroid} from "react-native"
import SERVER_URL from "@root/globalStr.env";


const startSession = async (seekerNumber, seekerReason) => {
    if (!seekerNumber) {
        ToastAndroid.showWithGravity("Number not entered", ToastAndroid.SHORT, ToastAndroid.CENTER);
        return false;
    }

    if (!seekerReason) {
        ToastAndroid.showWithGravity("Reason not entered", ToastAndroid.SHORT, ToastAndroid.CENTER);
        return false;
    }

    try {
        const sessionRes = await axios.post(`${SERVER_URL}/session/createSession`, {seekerNumber, seekerReason});

        if (sessionRes.status === 200) {
            await axios.post(`${SERVER_URL}/poolop/entered/${sessionRes.data.sessionId}`);
            return true;
        }


        return false;

    } catch (e) {
        throw new Error(e);
    }
}