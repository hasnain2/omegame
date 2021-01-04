import { JSONBodyHelper } from '.';
import { EndPoints } from '../utils/AppEndpoints';
import { AppLogger, AppShowToast } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';
const LIMIT = 100;
function GetGamesList(callback, CURSOR, BODY = {}) {
    fetch(`${EndPoints.GET_GAMES_LIST}?limit=${LIMIT}${CURSOR ? ('&cursor=' + CURSOR) : ''}`, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(BODY)
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GAMES LIST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GAMES LIST ERROR-----------', error)
        callback(false)
    });
}

function GetGameReviews(callback, CURSOR, FILTER, GAMEID) {
    fetch(`${EndPoints.GET_GAME_REVIEWS}${GAMEID}&filter=${FILTER}${CURSOR ? ('&cursor=' + CURSOR) : ''}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GAMES REVIEWS LIST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GAMES REVIEWS LIST ERROR-----------', error)
        callback(false)
    });
}

function GetUserReviews(callback, userID) {
    fetch(`${EndPoints.GET_REVIEWS_OF_USER}${userID}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then(JSONBodyHelper).then(([status, data]) => {
        // AppLogger('-----------GET USER REVIEWS RESPONSE----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GET USER REVIEWS ERROR-----------', error)
        callback(false)
    });
}

function PostGameReview(callback, PAYLOAD) {
    fetch(`${EndPoints.POST_GAME_REVIEW}`, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(PAYLOAD)
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------POSTING REVIEW ON GAME----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            AppShowToast("Review has been added.")
            callback(data?.data)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------POSTING REVIEW ON GAME-----------', error)
        callback(false)
    });
}


export {
    GetGamesList,
    GetGameReviews,
    PostGameReview,
    GetUserReviews
};
