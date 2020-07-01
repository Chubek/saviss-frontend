import axios from "axios";


export const _getIgnored = async number => {
    try {
        const ignoredRes = await axios.get(`${process.env.SERVER_URL}/user/getIgnored/${number}`);

        if (ignoredRes.status === 200) {
            const {ignoredNumbers} = ignoredRes.data;

            return ignoredNumbers;
        }
    } catch (e) {
        throw e;
    }
}