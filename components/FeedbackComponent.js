import React from "react";
import {CheckBox, Text, Button} from "react-native-elements";
import {Grid, Row, Col} from "react-native-easy-grid";
import {ActivityIndicator} from "react-native";
import globalStyles from "@components/globalStyles";

const feedbackComponent = props => {
    return (
        <Grid>
            <Row>
                <Text>Rate your chat. Your partner will be notified of the results.</Text>
            </Row>
            <Row>
                <CheckBox checked={props.thumbs} checkedIcon={{type: "font-awesome", name: "thumbs-down",}}
                          onPress={() => props.setThumbs(!thumbs)}
                          uncheckedIcon={{type: "font-awesome", name: "thumbs-up"}}/>
            </Row>
            <Row>
                <Col>
                    <CheckBox checked={props.star} title="Gold Star" onPress={() => props.setStar("gold")}/>
                </Col>
                <Col>
                    <CheckBox checked={props.star} title="Silver Star" onPress={() => props.setStar("silver")}/>
                </Col>
                <Col>
                    <CheckBox checked={props.star} title="Bronze Star" onPress={() => props.setStar("bronze")}/>
                </Col>
            </Row>
            <Row>
                {props.endPressed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            disabled={props.endPressed} title="Cancel" onPress={() => props.onEndSession()}/>}
            </Row>
        </Grid>
    )
}

export default feedbackComponent;