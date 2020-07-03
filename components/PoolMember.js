import React, {useState, useEffect} from "react";
import {AppState} from "react-native";
import {Button, Text} from "react-native-elements";
import {Grid, Row, Col} from "react-native-easy-grid"
import moment from "moment";
import timer from "react-native-timer";

const poolMember = props => {

    const [appState, setAppState] = useState(AppState.currentState);

    const calcTimeDiff = (givenTime) => {
        const millis = moment().diff(props.requestedAt);
        return moment.utc(millis).format("mm:ss");
    }

    const _handleAppStateChange = nextAppState => {
        if (appState.match(/inactive|background/) && nextAppState === "active") {
            console.log("App has come to the foreground!");
        }
        setAppState(nextAppState);
    };

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    return (
        <Grid key={props.key}>
            <Row>
                <Col>
                    <Text>{props.reason}</Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Text
                        h6>{appState === "active" ? timer.setInterval("time-difference", calcTimeDiff, 1000) : "App Inactive"}</Text>
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