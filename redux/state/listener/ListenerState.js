import * as CONSTANTS from "./ListenerConstants";
import {_logIn} from "@api/auth/_logIn";
import {_register} from "@api/auth/_register";
import {_requestOtp} from "@api/auth/_requestOtp";
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
            const registerRes = await _register(userName, number, bio);

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
        const otpRes = await _requestOtp(number);

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
                    dispatch({type: CONSTANTS.SET_TOKEN, payload: loginRes});
                    return true;
                }
            } catch (e) {
                if (e.message === "OTPINCORRECT") {
                    toast(`Incorrect OTP. You have ${remaining} tries remaining`);
                    dispatch({type: CONSTANTS.SET_REMAINING_NUM, payload: remaining - 1});
                    dispatch({type: CONSTANTS.SET_OTP_SENT, payload: false});
                    return false;
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
        if (getState().listener.token) {
            dispatch({ type: CONSTANTS.SET_TOKEN, payload: null });
            return true;
        }
    };
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
        case CONSTANTS.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}