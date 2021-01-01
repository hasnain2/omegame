import { JSONBodyHelper } from '.'
import { setUser } from '../redux/reducers/userSlice'
import { store } from '../redux/store'
import { EndPoints } from '../utils/AppEndpoints'
import { AppLogger } from '../utils/AppHelperMethods'
import { storeData } from '../utils/AppStorage'
import Interceptor from '../utils/Interceptor'
const UpdateProfile = (callback, formData) => {
    fetch(EndPoints.PROFILE_UPDATE_CREATE, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then(JSONBodyHelper).then(([status, data]) => {
        if (status === 201 || status === 200) {
            let userObj = formData?.userName ? { ...data.data, userName: formData?.userName } : { ...data.data }
            store.dispatch(setUser(userObj))
            storeData('user', { ...store.getState().root.user, ...data.data, ...userObj })
            callback({ ...store.getState().root.user, ...data.data, ...userObj })
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------PROFILE UPDATE ERROR-----------', error)
        callback(false)
    });

}


const RequestVerification = (callback, formData) => {
    fetch(EndPoints.REQUEST_VERIFICATION, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------RequestVerification RES----------', data)
        if (status === 201 || status === 200) {
            callback(true)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------RequestVerification ERROR-----------', error)
        callback(false)
    });
}

const GetAllTrendingUsers = (callback, cursor, query) => {
    AppLogger('-\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\---', `${EndPoints.GET_ALL_TRENDING_USERS}?sortBy=coin${cursor ? ('&cursor=' + cursor) : ''}${query ? ("&" + query) : ''}`)
    fetch(`${EndPoints.GET_ALL_TRENDING_USERS}?sortBy=coin${cursor ? ('&cursor=' + cursor) : ''}${query ? ("&" + query) : ''}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GET ALL TRENDING USERS RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GET ALL TRENDING USERS ERROR-----------', error)
        callback(false)
    });
}

const GetSingleUserProfile = (callback, id) => {
    fetch(`${EndPoints.GET_SINGLE_USER_PROFILE}${id}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GET SINGLE USER PROFILE RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GET SINGLE USER PROFILE ERROR-----------', error)
        callback(false)
    });
}

const ActionsOnUsers = (callback, id, TYPE) => {
    AppLogger('--------URL------\n', `${EndPoints.ACTIONS_ON_FRIENDS}--- ${id}---- ${TYPE}`)
    fetch(`${EndPoints.ACTIONS_ON_FRIENDS}`, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({
            accountId: id,
            status: TYPE
        })
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------ACTIONS ON FRIENDS RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------ACTIONS ON FRIENDS ERROR-----------', error)
        callback(false)
    });
}


const GerUserListByType = (callback, id, TYPE, CURSOR, query) => {
    fetch(`${EndPoints.GET_USER_LIST_BY_TYPE}${TYPE}?id=${id}${CURSOR ? ("&cursor=" + CURSOR) : ''}${query}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GETTING USER LIST OF ' + TYPE + ' RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GETTING USER LIST OF follower following ERROR-----------    ' + TYPE, error)
        callback(false)
    });
}

export { UpdateProfile, GetAllTrendingUsers, RequestVerification, GetSingleUserProfile, ActionsOnUsers, GerUserListByType }
