import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {ImageBackground} from "react-native";
import Images from "@components/Images";
import globalStyles from "@components/globalStyles";
import {authListener, requestOtp} from "@redux/state/listener/ListenerState";

export default compose(
    connect(
        state => ({
            number: state.listener.number
        }),
    ), Component => props => {
        const navigation = useNavigation();

        const onNavigateToStarSession = () => {
            navigation.navigate("StartSessionScreen");
        }

        const onNavigateToWaitingPool = () => {
            navigation.navigate("WaitingPoolScreen")
        }

        const onNavigateToDonate = () => {
            navigation.navigate("DonationScreen")
        }

        useEffect(() => {
            if (!props.number) {
                navigation.navigate("LoginScreen");
            }
        })

        return (
            <ImageBackground source={Images.background} style={globalStyles.bg}>
                <Component {...props} {...{
                    onNavigateToWaitingPool, onNavigateToStarSession,
                    onNavigateToDonate
                }}/>
            </ImageBackground>
        )
    })

