import React, {useEffect, useState} from "react";
import {ImageBackground, BackHandler} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Images from "@components/Images";
import {sendMessage, endSession, messageWatch} from "@redux/state/chat/ChatState";
import {toast} from "@wrappers/toast";

export default compose(
    connect(
        state => ({
            user: state.chat.user,
            messages: state.chat.messages,
            partnerLeft: state.chat.partnerLeft
        }),
        dispatch => ({
            sendMessage: (message) => dispatch(sendMessage(message)),
            endSession: () => dispatch(endSession()),
            messageWatch: () => dispatch(messageWatch())
        })
    ),
    Component => props => {
        const navigation = useNavigation();

        const [sendPushed, setSendPushed] = useState(false);
        const [endPressed, setEndPressed] = useState(false);

        const onSubmitMessage = async (message) => {
            setSendPushed(true);
            await props.sendMessage(message);
            setSendPushed(false);
        }

        const onEndSession = async () => {
            setEndPressed(true);
            await props.endSession();
            navigation.navigate("FrontPageScreen");
        }

        const handleBackPress = () => {
            toast("Back button is disabled");
            return true;
        }

        useEffect(() => {
            BackHandler.addEventListener("hardwareBackPress", handleBackPress)

            props.messageWatch();

            if (props.partnerLeft) {
                toast("Chat partner left the message");
                navigation.navigate("FrontPageScreen");
            }

            return BackHandler.removeEventListener("hardwareBackPress", handleBackPress);


        })


        return (
            <ImageBackground source={Images.background} style={globalStyles.bg}>
                <Component {...props} {...{onEndSession, onSubmitMessage, endPressed, sendPushed}} />
            </ImageBackground>
        )

    }
)