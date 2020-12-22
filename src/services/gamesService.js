import { EndPoints } from '../utils/AppEndpoints';
import { AppShowToast } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';
const LIMIT = 50;
function GetGamesList(callback, CURSOR) {
    fetch(EndPoints.GET_GAMES_LIST, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GAMES LIST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GAMES LIST ERROR-----------', error)
        callback(false)
    });
}

function GetGameReviews(callback, CURSOR, FILTER, GAMEID) {
    fetch(EndPoints.GET_GAME_REVIEWS + GAMEID + '&filter=' + FILTER, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GAMES REVIEWS LIST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GAMES REVIEWS LIST ERROR-----------', error)
        callback(false)
    });
}

function GetUserReviews(callback, userID) {
    fetch(`${EndPoints.GET_REVIEWS_OF_USER}${userID}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GET USER REVIEWS RESPONSE----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GET USER REVIEWS ERROR-----------', error)
        callback(false)
    });
}

function PostGameReview(callback, PAYLOAD) {
    fetch(EndPoints.POST_GAME_REVIEW, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(PAYLOAD)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------POSTING REVIEW ON GAME----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            AppShowToast("Review has been added.")
            callback(data?.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------POSTING REVIEW ON GAME-----------', error)
        callback(false)
    });
}


export {
    GetGamesList,
    GetGameReviews,
    PostGameReview,
    GetUserReviews
};
