import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import {Button} from "react-native-elements";
import frontPageEnhancer from "./enhancer"
import globalStyles from "@components/globalStyles";

const frontPageScreen = props => {
    return (
        <Grid>
            <Row>
                <Button title="Talk to Someone" onPress={() => props.onNavigateToChat()}
                containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}/>
            </Row>
            <Row>
                <Button title="Volunteer Zone" onPress={() => props.onNavigateToZone()}
                        containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}/>
            </Row>
            <Row>
                <Button title="Donate" onPress={() => props.onNavigateToDonate()}
                        containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}/>
            </Row>
        </Grid>
    )
}


export default frontPageEnhancer(frontPageScreen)