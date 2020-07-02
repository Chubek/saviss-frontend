import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Button, Input, Text} from "react-native-elements"
import loginScreenEnhancer from "./enhancer";
import globalStyles from "@components/globalStyles";


const loginScreen = props => {
    return (
        <Grid>
            <Row>
                <Input style={globalStyles.input} labelStyle={globalStyles.label} maxLength={15}
                       onChangeText={t => props.setNumber(t)}
                       label="Number"/>
            </Row>
            <Row>
                {props.otpSent ?
                    <Input style={globalStyles.input} labelStyle={globalStyles.label} maxLength={4}
                           onChangeText={t => props.setOtp(t)}
                           label="One-Time Password"/> : <Text>Please enter your number</Text>}
            </Row>
            <Row>

                <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                        title={props.loginText} disabled={props.loginPressed} onPress={() => {
                    props.otpSent ? props.onLogin() : props.onRequestOtp()
                }}/>
            </Row>
        </Grid>
    )
}


export default loginScreenEnhancer(loginScreen);