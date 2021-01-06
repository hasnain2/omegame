
import io from "socket.io-client";
import { setSettings } from "../redux/reducers/settingsSlice";
import { setUser } from "../redux/reducers/userSlice";
import { store } from "../redux/store";
import { QUEST_EVENTS } from "../utils/AppConstants";
import { DOMAIN } from "../utils/AppEndpoints";
import { AppLogger } from "../utils/AppHelperMethods";
import { GetSingleUserProfile } from "./profileService";

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
            AppLogger('---------SOCKET-------->', 'CONNECTED')
        });

        socket.on('disconnect', function (data) {
            AppLogger('---------SOCKET-------->', 'DIS-CONNECTED')
        });

        socket.on(QUEST_EVENTS.QUEST_COMPLETED, function (questData) { // QUEST COMPLETED
            AppLogger('---------SOCKET quest COMPLETED-------->', '')
            GetSingleUserProfile((userDataRes) => {
                if (userDataRes)
                    store.dispatch(setUser({ ...userDataRes }));
            }, store.getState().root?.user?._id);
        });

        socket.on(QUEST_EVENTS.QUEST_EXPIRED, function (questData) { // QUEST EXPIRED
            AppLogger('---------SOCKET quest EXPIRED-------->', '')
            debugger
        });

        socket.on('unreadCount', function (newData) {
            let messagesCounter = newData?.message?.chatWith || [];
            let notificationCounter = newData?.notification || 0;

            let UN_READ_MESSAGES = 0;
            messagesCounter?.forEach((ii) => {
                UN_READ_MESSAGES += ii?.unReadCount
            })
            store.dispatch(setSettings({
                chatCount: UN_READ_MESSAGES,
                notiCount: notificationCounter
            }))
            debugger
        })
    } catch (err) {
        AppLogger('---------SOCKET ERROR---------', err)
    }
};
