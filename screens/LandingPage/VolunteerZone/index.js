import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Button} from "react-native-elements";
import volunteerZoneEnhancer from "./enhancer";
import globalStyles from "@components/globalStyles";

const volunteerZoneScreen = props => {
    return (
        <Grid>
            <Row>
                <Button title="Login" onPress={() => props.onNavigateToLogin()}
                        containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}/>
            </Row>
            <Row>
                <Button title="Register" onPress={() => props.onNavigateToRegister()}
                        containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}/>
            </Row>
        </Grid>
    )
}

export default volunteerZoneEnhancer(volunteerZoneScreen);