import * as CONSTANTS from "./ListenerConstants";
import {_logIn} from "@api/auth/_logIn";
import {_requestOtp} from "@api/auth/_requestOtp";
import {_ignore} from "@api/auth/_ignore";
import {toast} from "@wrappers/toast";
import removedModule from "expo/build/removedModule";

const initialState = {
    number: null,
    otpSentNum: 3,
    otpSent: false,
    banned: false

}

export function requestOtp(number, pushToken) {
    return async dispatch => {
        const otpRes = await _requestOtp(number, pushToken);

        if (otpRes) {
            dispatch({type: CONSTANTS.SET_OTP_SENT, payload: true});
            return true;
        }

    }

}


export function authListener(number, otp) {
    return async (dispatch, getState) => {
        const remaining = getState().listener.otpSentNum;

        if (remaining >= 1) {
            try {
                const loginRes = await _logIn(number, otp);

                if (loginRes) {
                    dispatch({type: CONSTANTS.SET_NUMBER, payload: loginRes});
                    return true;
                }
            } catch (e) {
                if (e.message === "OTPINCORRECT") {
                    toast(`Incorrect OTP. You have ${remaining} tries remaining`);
                    dispatch({type: CONSTANTS.SET_REMAINING_NUM, payload: remaining - 1});
                    dispatch({type: CONSTANTS.SET_OTP_SENT, payload: false});
                }

                if (e.message === "OTPEXPIRED") {
                    dispatch({type: CONSTANTS.SET_OTP_SENT, payload: false});
                }

                if (e.message === "USERBANNED") {
                    dispatch({type: CONSTANTS.SET_BANNED, dispatch: true})
                }
            }
        } else {
            toast("You have no more tries left");
            dispatch({type: CONSTANTS.SET_REMAINING_NUM, payload: 3});
            dispatch({type: CONSTANTS.SET_OTP_SENT, payload: false});
            return false;
        }


    }

}

export function logoutListener() {
    return async (dispatch, getState) => {
        if (getState().listener.number) {
            dispatch({type: CONSTANTS.SET_NUMBER, payload: null});
            dispatch({type: CONSTANTS.SET_REMAINING_NUM, payload: null});
            dispatch({type: CONSTANTS.SET_OTP_SENT, payload: false});
            dispatch({type: CONSTANTS.SET_BANNED, payload: false});
            return true;
        }
    };
}

export function ignorePartner() {
    return async (dispatch, getState) => {
        const ignoreRes = await _ignore(getState().chat.sessionId, getState().chat.user, getState().listener.number);

        if (ignoreRes) {
            return true;
        }
    }
}

export default function ListenerStateReducer(
    state = initialState,
    action = {}
) {
    switch (action.type) {
        case CONSTANTS.SET_OTP_SENT:
            return {
                ...state,
                otpSent: action.payload
            };
        case CONSTANTS.SET_REMAINING_NUM:
            return {
                ...state,
                otpSentNum: action.payload
            };
        case CONSTANTS.SET_NUMBER:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}