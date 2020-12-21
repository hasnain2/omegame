
import io from "socket.io-client";
import { DOMAIN } from "../utils/AppEndpoints";

let SocketEndpoint = DOMAIN;

export let socket = io.connect(SocketEndpoint);

socket.on("connect", function () {
    console.log('--------socket CONNECTED----------')

});

export const initSocket = async (token) => {
    try {
        if (token)
            socket.removeAllListeners();
        else
            return


        debugger
        socket = io.connect(SocketEndpoint, {
            query: {
                token
            }
        });

        socket.on("connect", function () {
            console.log('--------socket CONNECTED----------')
        });

        socket.on('connect', function () {
            console.log('--------connectedddd----------')
        });
        socket.on('event', function (data) {
            console.log('--------event----------', data)
        });
        socket.on('disconnect', function () {
            console.log('--------disconnect----------')
        });



        console.log('--------IN SOCKET----------')
    } catch (err) {
        console.log('---------SOCKET ERROR---------', err)
    }
};
