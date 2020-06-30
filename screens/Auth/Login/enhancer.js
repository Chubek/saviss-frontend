import React, {useState} from "react";
import Images from "@components/Images";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {authListener, requestOtp} from "@redux/state/listener/ListenerState";
import {useNavigation} from '@react-navigation/native';

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
    ),
    Component => props => {
        const navigation = useNavigation();
        const [loginPressed, setLoginPressed] = useState(false);
        const [number, setNumber] = useState();
        const [otp, setOtp] = useState();

        const onRequestOtp = async () => {
            await props.requestOtp(number);
        }

        const onLogin = async () => {
            setLoginPressed(true);
            const loginRes = await props.authListener(number, otp);
            if (loginRes) {
               navigation.navigate("WaitingPoolScreen");
            }
            setLoginPressed(false);
        }


        return (
            <ImageBackground source={Images.background} style={globalStyles.bg}>
                <Component {...props} {...{
                    onRequestOtp, onLogin, setNumber,
                    setOtp,
                    loginPressed
                }}/>
            </ImageBackground>
        )


    }
)