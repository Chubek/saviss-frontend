import React, {useEffect, useState} from "react";
import {ImageBackground} from "react-native";
import {compose} from "redux";
import {connect} from "react-redux";
import {registerListener} from "@redux/state/listener/ListenerState";
import {toast} from "@wrappers/toast";
import Images from "@components/Images";
import timer from "react-native-timer";
import {useNavigation} from '@react-navigation/native';


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
        const navigation = useNavigation();
        const [userName, setUserName] = useState();
        const [number, setNumber] = useState();
        const [bio, setBio] = useState();
        const [numberInternational, setNumberInternational] = useState(false); //this checks if number is INTERNATIONAL not Indian
        const [registerClicked, setRegisterClicked] = useState(false);

        const onRegister = async () => {
            if (numberInternational && !props.token) {
                setRegisterClicked(true);
                const registerRes = props.registerListener(userName, number, bio);
                if (registerRes) {
                    navigation.navigate("LoginScreen");
                }
                setRegisterClicked(false);
            } else {
                toast("Number is not valid");
                return false;
            }
        }

        useEffect(() => {
            const pattern = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

            if (pattern.test(number)) {
                setNumberInternational(true);
            }
        })

        return (
            <ImageBackground style={globalStyles.bg} source={Images.background}><Component {...props}
                                                                                           {...{
                                                                                               setNumber,
                                                                                               setBio,
                                                                                               setUserName,
                                                                                               numberInternational,
                                                                                               registerClicked,
                                                                                               onRegister
                                                                                           }}/></ImageBackground>
        )

    }
)