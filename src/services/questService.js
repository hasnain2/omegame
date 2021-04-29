import { JSONBodyHelper } from '.';
import { EndPoints } from '../utils/AppEndpoints';
import { AppLogger } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';
const LIMIT = 50;
function GetQuests(callback, OFFSET = 0) { // PAGINATED = OFFSET BASE-
    fetch(`${EndPoints.GET_QUEST_LIST}?offset=${OFFSET}&limit=${LIMIT}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GET QUEST LIST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GET QUEST LIST ERROR-----------', error)
        callback(false)
    });
}

function GetSpecificQuestById(callback, questID) {
    fetch(`${EndPoints.GET_SPECIFIC_QUEST_BY_ID}${questID}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GET SPECIFIC QUEST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GET SPECIFIC QUEST ERROR-----------', error)
        callback(false)
    });
}

export {
    GetQuests,
    GetSpecificQuestById
};
