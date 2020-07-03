import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BackHandler, ImageBackground } from "react-native";
import Images from "@components/Images";
import globalStyles from "@components/globalStyles";
import Login from "../../Auth/Login";

export default compose(
  connect((state) => ({
    token: state.listener.token,
  })),
  (Component) => (props) => {
    const navigation = useNavigation();

    const onNavigateToStarSession = () => {
      navigation.navigate("StartSessionScreen");
    };

    const onNavigateToWaitingPool = () => {
      navigation.navigate("WaitingPoolScreen");
    };

    const onNavigateToDonate = () => {
      navigation.navigate("DonationScreen");
    };

    useEffect(() => {
      const handleBackPress = () => true;
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    });

    if (!props.token) {
      return <Login />;
    }

    return (
      <ImageBackground
        source={Images.background}
        style={globalStyles.bg}
        imageStyle={{ resizeMode: "repeat" }}
      >
        <Component
          {...props}
          {...{
            onNavigateToWaitingPool,
            onNavigateToStarSession,
            onNavigateToDonate,
          }}
        />
      </ImageBackground>
    );
  }
);
