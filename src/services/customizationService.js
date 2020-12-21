import { EndPoints } from '../utils/AppEndpoints';
import Interceptor from '../utils/Interceptor';
const LIMIT = 50;
function GetMyAssets(callback, type) {
    fetch(EndPoints.GET_MY_ASSETS + type, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GET MY ASSETS RES----------', type, JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GET MY ASSETS ERROR-----------', type, error)
        callback(false)
    });
}

function GetAllAssets(callback, type) {
    fetch(EndPoints.GET_ALL_ASSETS + type, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GET ALL ASSETS RES----------', type, JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GET ALL ASSETS ERROR-----------', type, error)
        callback(false)
    });
}

function BuyAsset(callback, assetID) {
    fetch(EndPoints.BUY_ASSET, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({
            assetId: assetID
        })
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------BUY ASSET RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------BUY ASSET ERROR-----------', error)
        callback(false)
    });
}

export {
    GetMyAssets,
    GetAllAssets,
    BuyAsset
};
