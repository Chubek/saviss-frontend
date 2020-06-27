import * as CONSTANTS from "./ListenerConstants";
import {login} from "@api/auth/logIn";
import {register} from "@api/auth/register";
import {requestOtp} from "@api/auth/requestOtp";
import {toast} from "@wrappers/toast";
import removedModule from "expo/build/removedModule";

const initialState = {
    token: null,
    otpSentNum: 3,
    otpSent: false

}

export function registerListener(userName, number, bio) {
    return async (dispatch, getState) => {
        if (getState().listener.token) {
            toast("User already logged in")
            return false;
        }

        try {
            const registerRes = await register(userName, number, bio);

            if (registerRes) {
                dispatch({type: CONSTANTS.SET_OTP_SENT, payload: true});
                return true;
            }
        } catch (e) {
            return false;
        }
    }

}

export function requestOtp(number) {
    return async dispatch => {
        const otpRes = await requestOtp(number);

        if (otpRes) {
            dispatch({type: CONSTANTS.SET_OTP_SENT, payload: true});
            return true;
        }

    }

}


export function authListener(number, otp) {
    return async (dispatch, getState) => {
        const remaining = getState().listener.otpSentNum;

        if (remaining > 0) {
            try {
                const loginRes = await login(number, otp);

                if (loginRes) {
                    dispatch({type: CONSTANTS.SET_OTP_SENT, payload: loginRes});
                    return true;
                }
            } catch (e) {
                if (e.message === "OTPINCORRECT") {
                    toast(`Incorrect OTP. You have ${remaining} tries remaining`);
                    dispatch({type: CONSTANTS.SET_REMAINING_NUM, payload: remaining - 1});
                    return false;
                }
            }
        } else {
            toast("You have no more tries left");
            dispatch({type: CONSTANTS.SET_REMAINING_NUM, payload: 3});
            return false;
        }


    }

}
