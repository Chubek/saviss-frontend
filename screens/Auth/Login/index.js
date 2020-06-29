import React from "react";
import {ActivityIndicator} from "react-native";
import {Grid, Row} from "react-native-easy-grid";
import {Button, Input} from "react-native-elements"
import loginScreenEnhancer from "./enhancer";

const loginScreen = props => {
    return (
        <Grid>
            <Row>
                <Input style={loginScreenStyles.input} maxLength={13} label="Number"/>
            </Row>
            <Row>
                {props.otpSent ?
                    <Input style={loginScreenStyles.input} maxLength={4} label="OTP"/> : "Please enter your number"}
            </Row>
            <Row>
                {props.loginPressed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button title={props.otpSent ? "Login" : "Send OTP"}/>}
            </Row>
        </Grid>
    )
}


export default loginScreenEnhancer(loginScreen);