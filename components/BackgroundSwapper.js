import React from "react";
import {ImageBackground, View} from "react-native";
import globalStyles from "@components/globalStyles";


const backgroundSwapper = ({background, children}) => (
    <ImageBackground source={background} style={globalStyles.bg}>
        <View>
            {children}
        </View>
    </ImageBackground>
)