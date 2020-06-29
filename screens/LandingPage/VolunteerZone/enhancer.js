import React, {useEffect} from "react";
import Images from "@components/Images";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigation} from '@react-navigation/native';


const volunteerZoneEnhancer = Component => props => {
    const navigation = useNavigation();

    const onNavigateToLogin = () => {
        navigation.navigate("LoginScreen");
    }

    const onNavigateToRegister = () => {
        navigation.navigate("RegisterScreen");
    }

    useEffect(() => {
        if (props.token) {
            navigation.navigate("WaitingPoolScreen");
        }
    })

    return (
        <ImageBackground source={Images.background} style={globalStyles.bg}>
            <Component {...props} onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister}/>
        </ImageBackground>
    )
}


export default compose(
    connect(
        state => ({
            token: state.listener.token
        })
    )
)(volunteerZoneEnhancer)