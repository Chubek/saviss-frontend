import React, {useEffect, useState} from "react";
import Images from "@components/Images";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {authListener, requestOtp} from "@redux/state/listener/ListenerState";


const loginScreenEnhancer = Component => props => {

    const [loginPressed, setLoginPressed] = useState(false);
    const [number, setNumber] = useState();
    const [otp, setOtp] = useState();

    const onRequestOtp = () => {
        props.requestOtp(number);
    }

    const onLogin = () => {
        props.authListener(number, otp);
        setLoginPressed(true);
    }

    useEffect(() => {
        if (props.otpSentNum > -1) {
            setLoginPressed(false);
        }


    })

    return (
        <ImageBackground source={Images.background} style={loginScreenStyles.bgStyle}>
            <Component {...props} onRequestOtp={onRequestOtp} onLogin={onLogin} setNumber={setNumber} setOtp={setOtp}
                       loginPress={loginPressed}/>
        </ImageBackground>
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
)(loginScreenEnhancer)