import { JSONBodyHelper } from '.';
import { EndPoints } from '../utils/AppEndpoints';
import { AppLogger } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';
const LIMIT = 100;
function GetInboxList(callback, CURSOR) {
    fetch(`${EndPoints.GET_INBOX_LIST}?limit=${LIMIT}&cursor=${CURSOR}&sort=desc`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------CHAT INBOX RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------CHAT INBOX ERROR-----------', error)
        callback(false)
    });
}

function MuteChatOfSpecificUser(callback, userID, TOGGLE) {
    fetch(`${EndPoints.MUTE_CHAT}${userID}`, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({ mute: TOGGLE })
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------MUTE CHAT RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------MUTE CHAT ERROR-----------', error)
        callback(false)
    });
}

function GetChatMessages(callback, CURSOR, friendID) {
    fetch(`${EndPoints.GET_CHAT_MESSAGES}?limit=${LIMIT}&cursor=${CURSOR}&sort=desc&friendId=${friendID}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------CHAT MESSAGES LIST ERROR-----------', error)
        callback(false)
    });
}
function DeleteChat(callback, chatID) {
    fetch(`${EndPoints.DELETE_CHAT_MESSAGES}${chatID}`, {
        method: 'DELETE',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------CHAT DELETE RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------CHAT DELETE ERROR-----------', error)
        callback(false)
    });
}

export {
    GetInboxList,
    MuteChatOfSpecificUser,
    GetChatMessages,
    DeleteChat
};
