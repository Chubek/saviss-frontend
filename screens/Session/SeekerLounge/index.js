import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Button, Text} from "react-native-elements";
import seekerLoungeEnhancer from "./enhancer"
import globalStyles from "@components/globalStyles";

const seekerLoungeScreen = props => {
    return (
        <Grid>
            <Row>
                <Text h2 style={globalStyles.waitingTextStyle}>Waiting to be accepted...</Text>
            </Row>
            <Row>
                <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                        disabled={props.cancelPushed} title="Cancel" onPress={() => props.onCancelSession()}/>
            </Row>
        </Grid>
    )
}


export default seekerLoungeEnhancer(seekerLoungeScreen);