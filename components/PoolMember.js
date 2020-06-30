import React from "react";
import {Button, Text} from "react-native-elements";
import {Grid, Row, Col} from "react-native-easy-grid"

export default poolMember = props => {
    return (
        <Grid key={props.key}>
            <Row>
                <Col>
                    <Text>{props.reason}</Text>
                </Col>
                <Col>
                    <Button title="Accept"
                            onPress={() => props.acceptSession(props.sessionId).then(() => props.navigation.navigate("ChatScreen"))}/>
                </Col>
            </Row>
        </Grid>
    )
}