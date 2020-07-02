import React, {useState, useEffect} from "react";
import Images from "@components/Images";
import {BackHandler, ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {authListener, requestOtp, getPushToken} from "@redux/state/listener/ListenerState";
import {useNavigation} from '@react-navigation/native';
import globalStyles from "@components/globalStyles";
import {toast} from "@wrappers/toast";


export default compose(
    connect(
        state => ({
            otpSent: state.listener.otpSent,
            otpSentNum: state.listener.otpSentNum,
            banned: state.listener.banned
        }),
        dispatch => ({
            authListener: (number, otp) => dispatch(authListener(number, otp)),
            requestOtp: (number) => dispatch(requestOtp(number)),
            getPushToken: () => dispatch(getPushToken())
        })
    ),
    Component => props => {
        const navigation = useNavigation();

        const [loginPressed, setLoginPressed] = useState(false);
        const [number, setNumber] = useState();
        const [otp, setOtp] = useState();
        const [updateView, setUpdateView] = useState(0);

        const onRequestOtp = async () => {
            setLoginPressed(true);
            await props.requestOtp(number);
            setLoginPressed(false);
        }

        const onLogin = async () => {
            setLoginPressed(true);
            const loginRes = await props.authListener(number, otp);
            if (loginRes) {
                toast(`Logged in as ${number}. Refreshing view...`)
                setUpdateView((updateView) => ++updateView);
                navigation.navigate("FrontPageScreen");
            }
            setLoginPressed(false);
        }

        useEffect(() => {
            if (props.banned) {
                navigation.navigate("BannedScreen");
            }
        }, [props.banned])

        useEffect(() => {
            props.getPushToken().done();
        }, [])

        useEffect(() => {

            const handleBackPress = () => true;
            BackHandler.addEventListener("hardwareBackPress", handleBackPress);

            return () => {
                BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
            };

        }, [])


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