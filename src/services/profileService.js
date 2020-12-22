import { setUser } from '../redux/reducers/userSlice'
import { store } from '../redux/store'
import { GET_ALL_USER_SORT_BY } from '../utils/AppConstants'
import { EndPoints } from '../utils/AppEndpoints'
import { storeData } from '../utils/AppStorage'
import Interceptor from '../utils/Interceptor'
const UpdateProfile = (callback, formData) => {
    console.log('---------------USER PROFILE GOING TO UPDATE RESPONSE--------------\n', formData)
    fetch(EndPoints.PROFILE_UPDATE_CREATE, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------PROFILE UPDATE RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            store.dispatch(setUser({ ...data.data }))
            storeData('user', { ...store.getState().root.user, ...data.data })
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------PROFILE UPDATE ERROR-----------', error)
        callback(false)
    });

}


const RequestVerification = (callback, formData) => {
    fetch(EndPoints.REQUEST_VERIFICATION, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------RequestVerification RES----------', data)
        if (status === 201 || status === 200) {
            callback(true)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------RequestVerification ERROR-----------', error)
        callback(false)
    });
}

const GetAllTrendingUsers = (callback, formData) => {
    fetch(`${EndPoints.GET_ALL_TRENDING_USERS}?sortBy=coin`, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GET ALL TRENDING USERS RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GET ALL TRENDING USERS ERROR-----------', error)
        callback(false)
    });
}

const GetSingleUserProfile = (callback, id) => {
    fetch(EndPoints.GET_SINGLE_USER_PROFILE + id, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GET SINGLE USER PROFILE RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GET SINGLE USER PROFILE ERROR-----------', error)
        callback(false)
    });
}

const ActionsOnUsers = (callback, id, TYPE) => {
    fetch(EndPoints.ACTIONS_ON_FRIENDS, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({
            accountIds: [id],
            status: TYPE
        })
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------ACTIONS ON FRIENDS RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------ACTIONS ON FRIENDS ERROR-----------', error)
        callback(false)
    });
}


const GerUserListByType = (callback, id, TYPE) => {
    console.log('-----------------FRIENDS FOLLOWERS OR FOLLOWING----------', EndPoints.GET_USER_LIST_BY_TYPE + TYPE + '?id=' + id)
    fetch(EndPoints.GET_USER_LIST_BY_TYPE + TYPE + '?id=' + id, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GETTING USER LIST OF ' + TYPE + ' RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GETTING USER LIST OF follower following ERROR-----------    ' + TYPE, error)
        callback(false)
    });
}

export { UpdateProfile, GetAllTrendingUsers, RequestVerification, GetSingleUserProfile, ActionsOnUsers, GerUserListByType }
