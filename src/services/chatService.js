import { EndPoints } from '../utils/AppEndpoints';
import Interceptor from '../utils/Interceptor';
const LIMIT = 50;
function GetInboxList(callback, CURSOR) {
    fetch(EndPoints.GET_INBOX_LIST + '?limit=' + LIMIT + '&cursor=' + CURSOR + '&sort=desc', {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------CHAT INBOX RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------CHAT INBOX ERROR-----------', error)
        callback(false)
    });
}

function GetChatMessages(callback, CURSOR, friendID) {
    fetch(EndPoints.GET_CHAT_MESSAGES + '?limit=' + LIMIT + '&cursor=' + CURSOR + '&sort=desc' + '&friendId=' + friendID, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------CHAT MESSAGES LIST ERROR-----------', error)
        callback(false)
    });
}
function DeleteChat(callback, chatID) {
    fetch(EndPoints.DELETE_CHAT_MESSAGES + chatID, {
        method: 'DELETE',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------CHAT DELETE RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------CHAT DELETE ERROR-----------', error)
        callback(false)
    });
}

export {
    GetInboxList,
    GetChatMessages,
    DeleteChat
};
