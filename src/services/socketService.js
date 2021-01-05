
import io from "socket.io-client";
import { setSettings } from "../redux/reducers/settingsSlice";
import { store } from "../redux/store";
import { DOMAIN } from "../utils/AppEndpoints";
import { AppLogger } from "../utils/AppHelperMethods";
import { AppShowPushNotification } from "./PushNotifications/NotificationMethods";

let SocketEndpoint = DOMAIN;

export let socket = io.connect(SocketEndpoint);

export const initSocket = async (token) => {
    try {
        if (token)
            socket.removeAllListeners();
        else
            return

        socket = io.connect(SocketEndpoint, {
            query: {
                token
            }
        });
        socket.on('connect', function (data) {
            // AppShowPushNotification('Status', "Connection has been established.", false);
        });
        socket.on('disconnect', function (data) {
            // AppShowPushNotification('Status', "Connection has been lost.",false);
        });
        socket.on('unreadCount', function (newData) {
            store.dispatch(setSettings({
                chatCount: 23,
                // notiCount:23
            }))
            debugger
        })
    } catch (err) {
        AppLogger('---------SOCKET ERROR---------', err)
    }
};
