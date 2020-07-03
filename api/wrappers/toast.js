import Toast from "react-native-tiny-toast";

export const toast = (msg) => {
  Toast.show(msg, {
    position: Toast.position.top,
  });
};
