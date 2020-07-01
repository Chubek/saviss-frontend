import * as CONSTANTS from "./PoolConstants";
import {realtime} from "@redux/state/chat/ChatState";
import {_getPool} from "@api/pool/_getPool";
import {_getSingle} from "@api/pool/_getSingle";
import {_getIgnored} from "@api/auth/_getIgnored";
import {toast} from "@wrappers/toast";
import _ from "lodash";

const initialState = {
    pool: [],
};

export function getPool() {
    return async (dispatch, getState) => {

        let poolRes = await _getPool(getState().listener.number);

        const ignoredNumbers = await _getIgnored(getState().listener.number);

        poolRes = _.filter(poolRes, poolMember => !ignoredNumbers.includes(poolMember.seekerNumber));

        if (poolRes) {
            dispatch({type: CONSTANTS.SET_POOL, payload: poolRes})
            return true;
        }

        return false;

    }
}


export function updatePool() {
    return async (dispatch, getState) => {
        try {

            const channel = realtime.channels.get("waiting-pool");


            channel.subscribe("entered", async (message) => {
                const data = JSON.parse(message.data);
                const poolRes = await _getSingle(data.sessionId, getState().listener.number);
                const ignoredNumbers = await _getIgnored(getState().listener.number);

                if (ignoredNumbers.includes(poolRes.seekerNumber)) {
                    return false;
                }

                if (poolRes) {
                    dispatch({type: CONSTANTS.UPDATE_POOL, payload: poolRes.data.poolSingle});

                    if (!getState().chat.isChatting) {
                        toast("New Seeker");
                    }
                }


            });

            channel.subscribe(["expired", "accepted"], message => {
                const data = JSON.parse(message.data);
                dispatch({type: CONSTANTS.REMOVE_FROM_POOL, payload: data.sessionId});
            });


        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };


}


export default function PoolStateReducer(
    state = initialState,
    action = {}
) {
    switch (action.type) {
        case CONSTANTS.SET_POOL:
            return {
                ...state,
                pool: action.payload
            };
        case CONSTANTS.UPDATE_POOL:
            return {
                ...state,
                pool: [...state.pool, ...action.payload]
            };
        case CONSTANTS.REMOVE_FROM_POOL:
            return {
                ...state,
                pool: state.pool.filter(item => {
                    return item.sessionId === action.payload;
                })
            };
        default:
            return state;
    }
}