import React from "react";
import {View} from "react-native";
import {Grid, Row} from "react-native-easy-grid";
import {Button, Input, Text} from "react-native-elements"
import loginScreenEnhancer from "./enhancer";
import globalStyles from "@components/globalStyles";
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const loginScreen = props => {
    return (
        <Grid>
            <Row>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                    }}>



                        <Input style={globalStyles.input} labelStyle={globalStyles.label} maxLength={15}
                               onChangeText={t => props.setNumber(t)}
                               label="Number"/>
                </TouchableWithoutFeedback>
            </Row>
            <Row>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                    }}>

                        {props.otpSent ?
                            <Input style={globalStyles.input} labelStyle={globalStyles.label} maxLength={4}
                                   onChangeText={t => props.setOtp(t)}
                                   label="One-Time Password"/> : <Text>Please enter your number {props.otpSent}</Text>}

                </TouchableWithoutFeedback>
            </Row>


            <Row>

                <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                        title={props.otpSent ? "Login" : "Request OTP"} disabled={props.loginPressed} onPress={() => {
                    props.otpSent ? props.onLogin() : props.onRequestOtp()
                }}/>
            </Row>

            <Row>
                <Text>By logging in, you agree to </Text><Text style={globalStyles.link}
                                                               onPress={() => props.onNavigateToTOS()}>Terms and
                Conditions</Text>
            </Row>
        </Grid>
    )
}


export default loginScreenEnhancer(loginScreen);