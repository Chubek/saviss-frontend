import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Input, Text, Button} from "react-native-elements";
import startSessionEnhancer from "./enhancer"
import globalStyles from "@components/globalStyles";
import DismissKeyboard from "@components/DismissKeyboard";


const startSessionScreen = props => {
    return (
        <Grid>
            <Row>
                <DismissKeyboard>
                    <Input style={globalStyles.input} labelStyle={globalStyles.label} multiline numberOfLines={5}
                           onChangeText={t => props.setReason(t)}
                           label="What do you wanna talk about? (Optional)"/>
                </DismissKeyboard>
            </Row>
            <Row>
                <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                        disabled={props.buttonPressed} title="Seek Help" onPress={() => props.onStartSession()}/>
            </Row>
        </Grid>
    )
}


export default startSessionEnhancer(startSessionScreen);