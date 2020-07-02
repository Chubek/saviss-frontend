import axios from "axios";
import { toast } from "@wrappers/toast";
import Constants from "expo-constants";

export const _getPool = async (listenerToken) => {
  try {
    const poolRes = await axios.get(
      `${Constants.manifest.extra.serverUrl}/pool/get/`,
      { headers: { "x-auth-token-listener": listenerToken } }
    );

    if (poolRes.status === 200 || poolRes.status === 303) {
      return poolRes.data.pool;
    }
  } catch (e) {
    if (e.response.status === 404) {
      toast("Nothing to show");
    }
    toast("Sorry something went wrong");

    // throw e;
  }
};
