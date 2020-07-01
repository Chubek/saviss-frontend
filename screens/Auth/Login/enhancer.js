import React, {useState, useEffect} from "react";
import Images from "@components/Images";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {authListener, requestOtp} from "@redux/state/listener/ListenerState";
import {useNavigation} from '@react-navigation/native';
import globalStyles from "@components/globalStyles";
import {Notifications} from 'expo';
import Permissions from "expo-permissions"
import {toast} from "@wrappers/toast";

export default compose(
    connect(
        state => ({
            otpSent: state.listener.otpSent,
            otpSentNum: state.listener.otpSentNum,
            banned: state.banned
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
        const [pushToken, setPushToken] = useState('');

        const onRequestOtp = async () => {
            await props.requestOtp(number, pushToken);
        }

        const onLogin = async () => {
            setLoginPressed(true);
            const loginRes = await props.authListener(number, otp);
            if (loginRes) {
                navigation.navigate("WaitingPoolScreen");
            }
            setLoginPressed(false);
        }


        useEffect(() => {
            if (props.banned) {
                navigation.navigate("BannedScreen");
            }

            Permissions.askAsync(Permissions.NOTIFICATIONS).then(status => {
                if (status === 'granted') {
                    Notifications.getDevicePushTokenAsync()
                        .then(token => {
                            setPushToken(token.toString);
                        })
                        .catch(err => {
                            toast(err.toString());
                        });
                }
            })
        })

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