import React, {useEffect, useState} from "react";
import {ImageBackground, BackHandler} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Images from "@components/Images";
import {ignorePartner} from "@redux/state/listener/ListenerState";
import {sendMessage, endSession, messageWatch, reportChat} from "@redux/state/chat/ChatState";
import {toast} from "@wrappers/toast";
import globalStyles from "@components/globalStyles";

export default compose(
    connect(
        state => ({
            user: state.chat.user,
            messages: state.chat.messages,
            partnerLeft: state.chat.partnerLeft
        }),
        dispatch => ({
            sendMessage: (message) => dispatch(sendMessage(message)),
            endSession: (star, thumbs) => dispatch(endSession(star, thumbs)),
            messageWatch: () => dispatch(messageWatch()),
            ignorePartner: () => dispatch(ignorePartner()),
            reportChat: (reason) => dispatch(reportChat(reason))
        })
    ),
    Component => props => {
        const navigation = useNavigation();

        const [sendPushed, setSendPushed] = useState(false);
        const [endPressed, setEndPressed] = useState(false);
        const [ignorePressed, setIgnorePressed] = useState(false);
        const [overlay, setOverlay] = useState(false);
        const [reason, setReason] = useState();
        const [thumbs, setThumbs] = useState(false);
        const [star, setStar] = useState("gold");
        const [feedback, setFeedback] = useState(false);

        const onReportChat = async () => {
            await props.reportChat(reason);
            props.endSession();
            navigation.navigate("FrontPageScreen");
        }

        const onSubmitMessage = async (message) => {
            setSendPushed(true);
            await props.sendMessage(message);
            setSendPushed(false);
        }

        const onEndSession = async () => {
            setEndPressed(true);
            await props.endSession(star, thumbs);
            navigation.navigate("FrontPageScreen");
        }

        const onIgnorePartner = async () => {
            setIgnorePressed(true);
            await props.ignorePartner();
            await props.endSession();
            navigation.navigate("FrontPageScreen");
        }

        const handleBackPress = () => {
            toast("Back button is disabled");
            return true;
        }

        useEffect(() => {
            BackHandler.addEventListener("hardwareBackPress", handleBackPress);

            props.messageWatch();

            if (props.partnerLeft) {
                toast("Chat partner left the message");
                navigation.navigate("FrontPageScreen");
            }

            return BackHandler.removeEventListener("hardwareBackPress", handleBackPress);


        })


        return (
            <ImageBackground source={Images.background} style={globalStyles.bg}>
                <Component {...props} {...{
                    onEndSession,
                    onSubmitMessage,
                    ignorePressed,
                    onIgnorePartner,
                    endPressed,
                    sendPushed,
                    overlay,
                    setOverlay,
                    setReason,
                    onReportChat,
                    thumbs,
                    star,
                    setThumbs,
                    setStar,
                    feedback,
                    setFeedback
                }} />
            </ImageBackground>
        )

    }
)