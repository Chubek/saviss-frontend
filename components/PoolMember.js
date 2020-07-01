import React from "react";
import {Button, Text} from "react-native-elements";
import {Grid, Row, Col} from "react-native-easy-grid"
import moment from "moment";
import timer from "react-native-timer";

const poolMember = props => {

    const calcTimeDiff = (givenTime) => {
        return moment().diff(givenTime).format("h:mm:ss");
    }

    return (
        <Grid key={props.key}>
            <Row>
                <Col>
                    <Text>{props.reason}</Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Text h6>{timer.setInterval("time-difference", () => {
                        calcTimeDiff(props.requestedAt)
                    }, 1000)}</Text>
                </Col>
                <Col>
                    <Button title="Accept"
                            onPress={() => props.acceptSession(props.sessionId).then(() => props.navigation.navigate("ChatScreen"))}/>
                </Col>
            </Row>
        </Grid>
    )
}

export default poolMember;