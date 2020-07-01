import {Notifications} from 'expo';
import * as Permissions from "expo-permissions"
import Constants from "expo-constants";
import {toast} from "@wrappers/toast";

export const _getPushToken = async () => {
    if (Constants.isDevice) {
        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(
                Permissions.NOTIFICATIONS
            );
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            toast('Failed to get push token for push notification!');
            return;
        }
        let token = await Notifications.getExpoPushTokenAsync();
        return token;
    } else {
        toast('Must use physical device for Push Notifications');
    }
}