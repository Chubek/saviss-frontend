import axios from "axios";
import Constants from "expo-constants";

export const _getIgnored = async number => {
    try {
        const ignoredRes = await axios.get(`${Constants.manifest.extra.serverUrl}/user/getIgnored/${number}`);

        if (ignoredRes.status === 200) {
            const {ignoredNumbers} = ignoredRes.data;

            return ignoredNumbers;
        }
    } catch (e) {
        throw e;
    }
}