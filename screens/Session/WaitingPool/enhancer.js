import React, {useEffect, useState} from "react";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Images from "@components/Images";
import {getPool, updatePool} from "@redux/state/pool/PoolState";
import {acceptSession} from "@redux/state/chat/ChatState";
import timer from "react-native-timer";

export default compose(
    connect(
        state => ({
            pool: state.pool.pool,
        }),
        dispatch => ({
            getPool: () => dispatch(getPool()),
            updatePool: () => dispatch(updatePool()),
            acceptSession: (sessionId) => dispatch(acceptSession(sessionId))
        })
    ),
    Component => props => {
        const navigation = useNavigation();

        const [getPushed, setGetPushed] = useState(false);

        const onGetPool = async () => {
            setGetPushed(true);
            await props.getPool();
            setGetPushed(false);
        }

        useEffect(() => {
            props.getPool().done();
            props.updatePool();
        })

        return (
            <ImageBackground source={Images.background} style={globalStyles.bg}>
                <Component {...props} {...{getPushed, navigation, onGetPool}} />
            </ImageBackground>
        )
    }
)