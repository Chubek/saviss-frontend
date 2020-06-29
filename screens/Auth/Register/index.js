import React from "react";
import {ActivityIndicator} from "react-native";
import {Grid, Col, Row} from "react-native-easy-grid";
import {Button, Icon, Input} from "react-native-elements"
import registerScreenEnhancer from "./enhancer";


const registerScreen = props => {
    return (
        <Grid>
            <Row>
                <Input style={globalStyles.input} labelStyle={globalStyles.label} label="Your Name"
                       onChangeText={t => props.setUserName(t)}/>
            </Row>
            <Row>
                <Col>
                    <Input style={globalStyles.input} labelStyle={globalStyles.label} label="Your Number"
                           onChangeText={t => props.setNumber(t)}/>
                </Col>
                <Col>
                    <Icon type="font-awesome" color="#fff" name={props.numberIndian ? "check" : "times"}/>
                </Col>
            </Row>
            <Row>
                <Input style={globalStyles.input} multiline numberOfLines={5} labelStyle={globalStyles.label}
                       label="About You"
                       onChangeText={t => props.setBio(t)}/>
            </Row>
            <Row>
                {props.registerClicked ? <ActivityIndicator size="small" color="#00ff00"/> :
                    <Button containerStyle={globalStyles.buttonContainerStyle} buttonStyle={globalStyles.buttonStyle}
                            disabled={props.registerClicked} title="Register" onPress={() => props.onRegister}/>}
            </Row>
        </Grid>
    )
}

export default registerScreenEnhancer(registerScreen);