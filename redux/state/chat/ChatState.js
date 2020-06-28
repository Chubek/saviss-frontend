import * as CONSTANTS from "./ChatConstants";
import {acceptSession} from "@api/chat/acceptSession";
import {cancelSession} from "@api/chat/cancelSession";
import {endSession} from "@api/chat/endSession";
import {sendMessage} from "@api/chat/sendMessage";
import {startSession} from "@api/chat/startSession";
import {checkTime} from "@api/chat/checkTime";
import {toast} from "@wrappers/toast";
import timer from "react-native-timer";
import moment from "moment";

import * as Ably from "ably";


const realtime = new Ably.Realtime(process.env.ABLY_API);


const initialState = {
    user: null,
    sessionId: null,
    partnerLeft: false,
    acceptedByListener: false,
    messages: [],
    startTime: null

};


export function startSession(seekerNumber, seekerReason) {
    return async dispatch => {

        const startRes = await startSession(seekerNumber, seekerReason);

        if (startRes) {
            dispatch({type: CONSTANTS.SET_SESSION_ID, payload: startRes});
            dispatch({type: CONSTANTS.SET_PARTNER_LEFT, payload: false});
            dispatch({type: CONSTANTS.SET_START_TIME, payload: moment()});

            return true;
        } else {
            return false;
        }


    }
}


export function acceptSession(sessionId) {
    return async (dispatch, getState) => {

        const acceptRes = acceptSession(sessionId, getState().listener.token);

        if (acceptRes) {
            dispatch({type: CONSTANTS.SET_SESSION_ID, payload: sessionId});
            dispatch({type: CONSTANTS.SET_NAME, payload: "Listener"});
        }

    }
}

export function cancelSession() {
    return async dispatch => {

        const cancelRes = await cancelSession();

        if (cancelRes) {
            dispatch({type: CONSTANTS.SET_SESSION_ID, payload: null});
            return true;
        }
    }

}

export function endSession() {
    return async (dispatch, getState) => {

        const endRes = await endSession(getState().chat.sessionId);

        if (endRes) {
            dispatch({type: CONSTANTS.SET_SESSION_ID, payload: null});
            dispatch({type: CONSTANTS.SET_ACCEPTED_BY_LISTENER, payload: false});
            dispatch({type: CONSTANTS.SET_MESSAGES, payload: null});
            dispatch({type: CONSTANTS.SET_NAME, payload: null});
            dispatch({type: CONSTANTS.SET_START_TIME, payload: null})
            return true;
        }
    }


}


export function sendMessage(message, sessionId) {
    return async (dispatch, getState) => {

        return await sendMessage(message, getState().chat.sessionId);
    }
}

export function seekerLounge() {
    return async (dispatch, getState) => {

        timer.setInterval("checkTimeInterval", async () => {
            await checkTime(getState().chat.startTime, getState().chat.sessionId)
        }, 5000);

        const channel = realtime.channels.get(getState().chat.sessionId);

        channel.subscribe("accepted", (message) => {
            dispatch({type: CONSTANTS.SET_ACCEPTED_BY_LISTENER, payload: true});
            dispatch({type: CONSTANTS.SET_NAME, payload: "Seeker"});
            toast("Session was accepted");
            return true;
        });

    }

}

export function messageWatch() {
    return async (dispatch, getState) => {
        try {

            const channel = realtime.channels.get(getState().chat.sessionId);

            channel.subscribe("message", message => {
                const data = JSON.parse(message.data);

                dispatch({type: CONSTANTS.SET_MESSAGES, payload: data});

            });

            channel.subscribe("left", message => {
                dispatch({type: CONSTANTS.SET_PARTNER_LEFT, payload: true});
            });

        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };
}


export default function ChatStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CONSTANTS.SET_SESSION_ID:
            return {
                ...state,
                sessionId: action.payload
            };
        case CONSTANTS.SET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            };
        case CONSTANTS.SET_NAME:
            return {
                ...state,
                user: action.payload
            };
        case CONSTANTS.SET_ACCEPTED_BY_LISTENER:
            return {
                ...state,
                acceptedByListener: action.payload
            };
        case CONSTANTS.SET_PARTNER_LEFT:
            return {
                ...state,
                partnerLeft: action.payload
            };
        case CONSTANTS.SET_START_TIME:
            return {
                ...state,
                startTime: action.payload
            }
        default:
            return state;
    }
}
