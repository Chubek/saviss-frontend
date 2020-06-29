import React, {useEffect, useState} from "react";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {registerListener} from "@redux/state/listener/ListenerState";
import {toast} from "@wrappers/toast";
import Images from "@components/Images";
import timer from "react-native-timer";


export default compose(
    connect(
        state => ({
            token: state.listener.token,
        }),
        dispatch => ({
            registerListener: (userName, number, bio) => dispatch(registerListener(userName, number, bio))
        })
    ),
    Component => props => {

        const [userName, setUserName] = useState();
        const [number, setNumber] = useState();
        const [bio, setBio] = useState();
        const [numberIndian, setNumberIndian] = useState(false);
        const [registerClicked, setRegisterClicked] = useState(false);

        const onRegister = () => {
            if (numberIndian && !props.token) {
                setRegisterClicked(true);
                props.registerListener(userName, number, bio);
            } else {
                toast("Number is not Indian");
                return false;
            }
        }

        useEffect(() => {
            const pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;

            if (pattern.test(number)) {
                setNumberIndian(true);
            }

            if (registerClicked) {
                timer.setTimeout("set-register-clicked", () => {
                    setRegisterClicked(false)
                }, 10000);
            }

        })

        return (
            <ImageBackground style={globalStyles.bg} source={Images.background}><Component {...props}
                                                                                           setNumber={setNumber}
                                                                                           setBio={setBio}
                                                                                           setUserName={setUserName}
                                                                                           numberIndian={numberIndian}
                                                                                           registerClicked={registerClicked}
                                                                                           onRegister={onRegister}/></ImageBackground>
        )

    }
)