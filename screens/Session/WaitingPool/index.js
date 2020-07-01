import React from "react";
import {Grid, Row} from "react-native-easy-grid";
import PoolMember from "@components/PoolMember";
import {Button} from "react-native-elements";
import waitingPoolEnhancer from "./enhancer"
import {ActivityIndicator} from "react-native";
import uuid from "react-native-uuid";
import globalStyles from "@components/globalStyles";

const waitingPoolScreen = props => {
    return (
        <Grid>
            <Row>
                {props.getPushed ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            disabled={props.getPushed} title="Update Pool" onPress={() => props.onGetPool()}/>}
            </Row>
            <Row>
                {
                    props.pool.map(l => {
                        return <PoolMember key={uuid()} requestedAt={l.requestedAt} reason={l.reason}
                                           sessionId={l.sessionId} {...props} />
                    })
                }
            </Row>
        </Grid>
    )
}


export default waitingPoolEnhancer(waitingPoolScreen);