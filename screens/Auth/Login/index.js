import React from "react";
import {ActivityIndicator} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {authListener, requestOtp} from "@redux/state/listener/ListenerState";
import loginScreenEnhancer from "./enhancer"
import {Grid, Row} from "react-native-easy-grid";
import {Button, Input} from "react-native-elements"

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


export default compose(
    connect(
        state => ({
            otpSent: state.listener.otpSent,
            otpSentNum: state.listener.otpSentNum
        }),
        dispatch => ({
            authListener: (number, otp) => dispatch(authListener(number, otp)),
            requestOtp: (number) => dispatch(requestOtp(number))
        })
    )
)(loginScreenEnhancer(loginScreen))