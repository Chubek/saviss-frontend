import React from "react";
import {Text} from "react-native-elements";
import {ImageBackground} from "react-native";
import Images from "./Images";
import globalStyles from "@components/globalStyles";


const bannedScreen = () => {
    return (
        <ImageBackground source={Images.background} style={globalStyles.bg}>
            <Text h1>You are banned.</Text>
        </ImageBackground>
    )
}

export default bannedScreen;