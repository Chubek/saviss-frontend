import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {store, persistor} from "@redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
            </PersistGate>
        </Provider>
    );
}


