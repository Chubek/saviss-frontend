import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Button, Overlay, Text} from "react-native-elements";
import chatEnhancer from "./enhancer";
import {ActivityIndicator} from "react-native";
import {GiftedChat} from "react-native-gifted-chat";
import globalStyles from "@components/globalStyles";
import ReportChat from "@components/ReportChat";
import FeedbackComponent from "@components/FeedbackComponent";

const chatScreen = props => {
    return (
        <Grid>
            <Row style={styles.chatHeader}>
                <Text h5>Chatting as: {props.user}</Text>
            </Row>
            <Row>
                {props.ignorePressed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            disabled={props.ignorePressed} title="Ignore Partner"
                            onPress={() => props.onIgnorePartner()}/>}
            </Row>
            <Row>
                <Button title="Report" onPress={() => props.setOverlay(true)}/>
            </Row>
            <Row>
                <Button title="End Session" onPress={() => props.setFeedback(true)}/>
            </Row>
            <Row>
                <GiftedChat
                    messages={props.messages}
                    onSend={messages => props.onSubmitMessage(messages)}
                    user={{_id: this.props.user === "Listener" ? 1 : 2}}
                />
            </Row>
            <Overlay isVisible={props.overlay} onBackdropPress={props.setOverlay(false)}>
                <ReportChat {...props} />
            </Overlay>
            <Overlay isVisible={props.feedback}>
                <FeedbackComponent {...props} />
            </Overlay>
        </Grid>
    )
}


export default chatEnhancer(chatScreen);