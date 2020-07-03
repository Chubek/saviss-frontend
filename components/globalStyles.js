import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        fontSize: 22,
        alignSelf: 'center'
    },
    tcP: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    tcL: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    tcContainer: {
        marginTop: 15,
        marginBottom: 15,
        height: this * .7
    },

    button: {
        backgroundColor: '#136AC7',
        borderRadius: 5,
        padding: 10
    },

    buttonDisabled: {
        backgroundColor: '#999',
        borderRadius: 5,
        padding: 10
    },

    buttonLabel: {
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center'
    },
    link: {
        color: "blue"
    },

    bg: {
        flex: 1,
        alignItems: "center",
    },
    input: {
        color: "#fff",
        borderBottomWidth: 20,
    },
    label: {
        color: "#582630",
        textShadowColor: "#F1A66A",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 13,
    },
    buttonContainerStyle: {
        backgroundColor: "#124",
        width: "80%",
        alignSelf: "center",
    },
    buttonStyle: {
        backgroundColor: "#124",
        borderRadius: 20,
    },
    chatHeader: {
        backgroundColor: "#f01",
    },
    adSpace: {
        backgroundColor: "#f12",
    },
    waitingTextStyle: {
        color: "#fff",
    },
});
