import React, {useEffect, useState} from "react";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {startSession} from "@redux/state/chat/ChatState";
import {useNavigation} from '@react-navigation/native';
import Images from "@components/Images";
import {toast} from "@wrappers/toast";
import globalStyles from "@components/globalStyles";

export default compose(
    connect(
        state => ({
            isChatting: state.chat.isChatting,
        }),
        dispatch => ({
            startSession: (reason) => dispatch(startSession(number, reason))
        })
    ),
    Component => props => {
        const navigation = useNavigation();


        const [reason, setReason] = useState();
        const [buttonPressed, setButtonPressed] = useState(false);

        const onStartSession = async () => {
            if (!props.isChatting) {
                setButtonPressed(true);
                const startRes = await props.startSession(reason);

                if (startRes) {
                    navigation.navigate("SeekerLoungeScreen");
                }

                setButtonPressed(false);

            } else {
                toast("Currently chatting");
                return false;
            }
        }

        return (
            <ImageBackground source={Images.background} style={globalStyles.bg}>
                <Component {...props} {...{setReason, buttonPressed, onStartSession}} />
            </ImageBackground>
        )
    }
)