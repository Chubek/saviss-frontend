import React from "react";
import {Button, Text} from "react-native-elements";
import {Grid, Row, Col} from "react-native-easy-grid"
import moment from "moment";
import timer from "react-native-timer";

const poolMember = props => {

    const calcTimeDiff = (givenTime) => {
        const millis = moment().diff(props.requestedAt);
        return moment.utc(millis).format("mm:ss");
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
                    <Text h6>{timer.setInterval("time-difference", calcTimeDiff, 1000)}</Text>
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