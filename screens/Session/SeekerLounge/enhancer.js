import React, {useEffect, useState} from "react";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Images from "@components/Images";
import {seekerLounge, cancelSession, startSession} from "@redux/state/chat/ChatState";
import globalStyles from "@components/globalStyles";

export default compose(
    connect(
        state => ({
            acceptedByListener: state.chat.acceptedByListener,
        }),
        dispatch => ({
            seekerLounge: () => dispatch(seekerLounge()),
            cancelSession: () => dispatch(cancelSession())
        })
    ),
    Component => props => {
        const navigation = useNavigation();

        const [cancelPushed, setCancelPushed] = useState(false);

        const onCancelSession = async () => {
            setCancelPushed(true);
            const cancelRes = await props.cancelSession();

            if (cancelRes) {
                navigation.navigate("FrontPageScreen");
            }

            setCancelPushed(false);
        }

        useEffect(() => {

            props.seekerLounge();

            if (props.acceptedByListener) {
                navigation.navigate("ChatScreen");
            }
        })

        return (
            <ImageBackground source={Images.background} style={globalStyles.bg} >
                <Component {...props} {...{onCancelSession, cancelPushed}} />
            </ImageBackground>
        )

    }
    )

