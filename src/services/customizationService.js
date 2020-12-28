import { Alert } from 'react-native';
import { JSONBodyHelper } from '.';
import { EndPoints } from '../utils/AppEndpoints';
import { AppLogger } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';
const LIMIT = 50;
function GetMyAssets(callback, type) {
    fetch(EndPoints.GET_MY_ASSETS + type, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => JSONBodyHelper(response)).then(([status, data]) => {
        AppLogger('-----------GET MY ASSETS RES----------' + type, JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GET MY ASSETS ERROR-----------' + type, error)
        callback(false)
    });
}

function GetAllAssets(callback, type) {
    fetch(EndPoints.GET_ALL_ASSETS + type, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => JSONBodyHelper(response)).then(([status, data]) => {
        AppLogger('-----------GET ALL ASSETS RES----------' + type, JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GET ALL ASSETS ERROR-----------' + type, error)
        callback(false)
    });
}

function PromtToSetAsDefault(callback, type, assetID) {
    Alert.alert(`Set ${type.toLowerCase()}`, `Do you want to set this ${type.toLowerCase()} as your default ${type.toLowerCase()}`,
        [{
            text: "No",
            onPress: () => {
                callback(false)
            },
            style: "cancel"
        }, {
            text: "Yes", onPress: () => {
                SetAssetAsDefault((setAssetRes) => {
                    if (setAssetRes)
                        callback(true)
                    else
                        callback(false)
                }, type, assetID)
            }
        }], { cancelable: false });
}
function SetAssetAsDefault(callback, type, assetID) {
    fetch(EndPoints.SET_ASSET_DEFAULT + type, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({
            assetId: assetID
        })
    }).then((response) => JSONBodyHelper(response)).then(([status, data]) => {
        AppLogger('-----------SETTING DEFAULT ASSET RES----------' + type, JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------SETTING DEFAULT ASSET ERROR-----------' + type, error)
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
    }).then((response) => JSONBodyHelper(response)).then(([status, data]) => {
        AppLogger('-----------BUY ASSET RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------BUY ASSET ERROR-----------', error)
        callback(false)
    });
}

export {
    GetMyAssets,
    GetAllAssets,
    BuyAsset,
    SetAssetAsDefault,
    PromtToSetAsDefault
};
