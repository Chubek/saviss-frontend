import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {ImageBackground} from "react-native";


export default Component => props => {
    const navigation = useNavigation();

    const onNavigateToZone = () => {
        navigation.navigate("VolunteerZoneScreen");
    }

    const onNavigateToChat = () => {
        navigation.navigate("StartSessionScreen")
    }

    const onNavigateToDonate = () => {
        navigation.navigate("DonationScreen")
    }

    return (
        <ImageBackground source={Images.background} style={globalStyles.bg}>
            <Component {...props} {...{
                onNavigateToZone, onNavigateToChat,
                onNavigateToDonate
            }}/>
        </ImageBackground>
    )
}


