import React, {useEffect, useState} from "react";
import Images from "@components/Images";
import {ImageBackground} from "react-native";


const loginScreenEnhancer = Component => {
    return props => {

        const [loginPressed, setLoginPressed] = useState(false);

        const onSendOtp = () => {
            props.otpSent(props.number);
        }

        const onLogin = () => {
            props.authListener(props.number, props.otp);
            setLoginPressed(true);
        }

        useEffect(() => {
            if (props.otpSentNum > -1) {
                setLoginPressed(false);
            }


        })

        return (
            <ImageBackground source={Images.background} style={loginScreenStyles.bgStyle}>
                <Component {...props} loginPress={loginPressed}/>
            </ImageBackground>
        )

    }

}

export default loginScreenEnhancer;