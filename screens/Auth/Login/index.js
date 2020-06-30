import React from "react";
import {ActivityIndicator} from "react-native";
import {Grid, Row} from "react-native-easy-grid";
import {Button, Input} from "react-native-elements"
import loginScreenEnhancer from "./enhancer";
import globalStyles from "@components/globalStyles";

const loginScreen = props => {
    return (
        <Grid>
            <Row>
                <Input style={globalStyles.input} labelStyle={globalStyles.label} maxLength={13}
                       onChangeText={t => props.setNumber(t)}
                       label="Number"/>
            </Row>
            <Row>
                {props.otpSent ?
                    <Input style={globalStyles.input} labelStyle={globalStyles.label} maxLength={4}
                           onChangeText={t => props.setOtp(t)}
                           label="One-Time Password"/> : "Please enter your number"}
            </Row>
            <Row>
                {props.loginPressed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            title={props.otpSent ? "Login" : "Send OTP"} onPress={() => {
                        props.otpSent ? props.onLogin() : props.onRequestOtp()
                    }}/>}
            </Row>
        </Grid>
    )
}


export default loginScreenEnhancer(loginScreen);