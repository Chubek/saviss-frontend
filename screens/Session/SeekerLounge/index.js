import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Button, Text} from "react-native-elements";
import seekerLoungeEnhancer from "./enhancer"
import {ActivityIndicator} from "react-native";

const seekerLoungeScreen = props => {
    return (
        <Grid>
            <Row>
                <Text h2 style={globalStyles.waitingTextStyle}>Waiting to be accepted...</Text>
            </Row>
            <Row>
                {props.cancelPushed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            disabled={props.registerClicked} title="Cancel" onPress={() => props.onCancelSession()}/>}
            </Row>
        </Grid>
    )
}


export default seekerLoungeEnhancer(seekerLoungeScreen);