import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./Auth/Login";
import FrontPageScreen from "./LandingPage/FrontPage";
import StartSessionScreen from "./LandingPage/StartSession";
import ChatScreen from "./Session/Chat";
import SeekerLoungeScreen from "./Session/SeekerLounge";
import WaitingPoolScreen from "./Session/WaitingPool";
import BannedScreen from "@components/BannedScreen";
import TermsAndConditionsScreen from "@components/TermsAndConditions";

const Stack = createStackNavigator();

export default function NavigationStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FrontPageScreen">
                <Stack.Screen
                    name="FrontPageScreen"
                    component={FrontPageScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{title: "Login"}}
                />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                    options={{headerShown: false, headerLeft: null}}
                />
                <Stack.Screen
                    name="StartSessionScreen"
                    component={StartSessionScreen}
                    options={{title: "Start Session"}}
                />
                <Stack.Screen
                    name="WaitingPoolScreen"
                    component={WaitingPoolScreen}
                    options={{title: "Waiting Pool"}}
                />
                <Stack.Screen
                    name="SeekerLoungeScreen"
                    component={SeekerLoungeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="BannedScreen"
                    component={BannedScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="TOSScreen"
                    component={TermsAndConditionsScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
