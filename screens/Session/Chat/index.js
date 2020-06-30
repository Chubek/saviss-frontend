import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Button} from "react-native-elements";
import chatEnhancer from "./enhancer";
import {ActivityIndicator} from "react-native";
import {GiftedChat} from "react-native-gifted-chat";

const chatScreen = props => {
    return (
        <Grid>
            <Row>
                {props.endPressed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            disabled={props.endPressed} title="Cancel" onPress={() => props.onEndSession()}/>}
            </Row>
            <Row>
                <GiftedChat
                    messages={props.messages}
                    onSend={messages => props.onSubmitMessage(messages)}
                    user={{_id: this.props.user === "Listener" ? 1 : 2}}
                />
            </Row>
        </Grid>
    )
}


export default chatEnhancer(chatScreen);