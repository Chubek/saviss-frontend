import React from "react";
import { Image } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import { Button } from "react-native-elements";
import frontPageEnhancer from "./enhancer";
import style from "./style";
import globalStyles from "@components/globalStyles";
import images from "@components/Images";

const frontPageScreen = (props) => {
  return (
    <Grid>
      <Row style={style.logoRow}>
        <Image source={images.logo} style={style.logo} />
      </Row>
      <Row style={style.row}>
        <Button
          icon={
            <Image source={images.teller_display_right} style={style.icon} />
          }
          title="Talk to Someone"
          onPress={() => props.onNavigateToStarSession()}
          containerStyle={globalStyles.buttonContainerStyle}
          buttonStyle={globalStyles.buttonStyle}
        />
      </Row>
      <Row style={style.row}>
        <Button
          icon={
            <Image
              source={images.icon_listener}
              style={style.icon}
              iconContainerStyle={style.iconContainerStyle}
            />
          }
          title="Listen to Someone"
          onPress={() => props.onNavigateToWaitingPool()}
          containerStyle={globalStyles.buttonContainerStyle}
          buttonStyle={globalStyles.buttonStyle}
        />
      </Row>
      <Row style={{ ...style.row, ...style.lastRow }}>
        <Button
          title="Donate"
          onPress={() => props.onNavigateToDonate()}
          containerStyle={globalStyles.buttonContainerStyle}
          buttonStyle={globalStyles.buttonStyle}
        />
      </Row>
    </Grid>
  );
};

export default frontPageEnhancer(frontPageScreen);
