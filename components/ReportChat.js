import React from "react";
import {Button, Input} from "react-native-elements";
import {Grid, Row, Col} from "react-native-easy-grid";
import globalStyles from "@components/globalStyles";

const reportChatComponent = props => {
    return (
        <Grid>
            <Row>
                <Input labelStyle={globalStyles.label} style={globalStyles.input} label="You Reason"
                       onChangeText={t => props.setReason(t)}/>
            </Row>
            <Row>
                <Col>
                    <Button title='Report' containerStyle={globalStyles.buttonContainerStyle}
                            buttonStyle={globalStyles.buttonStyle} onPress={props.onReportChat()}/>
                </Col>
                <Col>
                    <Button title="Cancel" containerStyle={globalStyles.buttonContainerStyle}
                            buttonStyle={globalStyles.buttonStyle} onPress={props.setOverlay(false)}/>
                </Col>
            </Row>
        </Grid>
    )
}

export default reportChatComponent;