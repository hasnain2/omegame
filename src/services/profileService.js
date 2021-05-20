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
        if (status === 201 || status === 200) {
            callback(true)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------RequestVerification ERROR-----------', error)
        callback(false)
    });
}
const UpdateUserProfile = () => {
    GetSingleUserProfile((userDataRes) => {
        if (userDataRes)
            store.dispatch(setUser({ ...userDataRes }));
    }, store.getState().root?.user?._id);
}
const GetAllTrendingUsers = (callback, cursor, query) => {
    fetch(`${EndPoints.GET_ALL_TRENDING_USERS}?sortBy=coin${cursor ? ('&cursor=' + cursor) : ''}${query ? ("&" + query) : ''}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
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
        console.log(data)
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
    fetch(`${EndPoints.ACTIONS_ON_FRIENDS}`, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({
            accountId: id,
            status: TYPE
        })
    }).then(JSONBodyHelper).then(([status, data]) => {
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
        if (status === 201 || status === 200) {
            callback(data.data)
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------GETTING USER LIST OF follower following ERROR-----------    ' + TYPE, error)
        callback(false)
    });
}
const GetUserList = (callback,limit, sortBy, query, cursor) => {
    fetch(`${EndPoints.GET_ALL_TRENDING_USERS}?sortBy=coin${query ? "&search=" + query : ""}${limit ? "&limit="+10: 5}`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        if (status === 201 || status === 200) {
            callback(data.data)
        } else{
            console.log("Error")
            callback(false);}
    }).catch((error) => {
        AppLogger('---------GETTING USER LIST OF follower following ERROR-----------    ' + TYPE, error)
        callback(false)
    });
}

export {
    UpdateProfile, UpdateUserProfile,
    GetAllTrendingUsers, RequestVerification,
    GetSingleUserProfile, ActionsOnUsers,
    GerUserListByType,
    GetUserList,
}
