
import io from "socket.io-client";
import { DOMAIN } from "../utils/AppEndpoints";
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

        socket.on('connect', function () {
            // AppShowPushNotification('Status', "Connection has been established.");
        });
        socket.on('disconnect', function () {
            // AppShowPushNotification('Status', "Connection has been lost.");
        });
    } catch (err) {
        console.log('---------SOCKET ERROR---------', err)
    }
};
