import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Input, Button} from "react-native-elements";
import startSessionEnhancer from "./enhancer"
import {ActivityIndicator} from "react-native";


const startSessionScreen = props => {
    return (
        <Grid>
            <Row>
                <Input style={globalStyles.input} labelStyle={globalStyles.label} maxLength={13}
                       onChangeText={t => props.setNumber(t)}
                       label="Your Number"/>
            </Row>
            <Row>
                <Input style={globalStyles.input} labelStyle={globalStyles.label} multiline numberOfLines={5}
                       onChangeText={t => props.setReason(t)}
                       label="Your Reason"/>
            </Row>
            <Row>
                {props.buttonPressed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            disabled={props.registerClicked} title="Seek Help" onPress={() => props.onStartSession()}/>}
            </Row>
        </Grid>
    )
}


export default startSessionEnhancer(startSessionScreen);