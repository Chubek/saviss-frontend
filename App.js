import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppRegistry } from "react-native";
import { store, persistor } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Navigator from "./screens/index";

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Navigator />
      {/* </PersistGate> */}
    </Provider>
  );
}

AppRegistry.registerComponent("main", () => App);
