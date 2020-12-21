import { resetHomeFeed } from '../redux/reducers/homeFeedSlice'
import { resetSavedPosts } from '../redux/reducers/savedPostsSlice'
import { resetUser, setUser } from '../redux/reducers/userSlice'
import { store } from '../redux/store'
import { EndPoints } from '../utils/AppEndpoints'
import { AppShowToast } from '../utils/AppHelperMethods'
import { clearStorage, getData, removeItemsFromLocalStorage, storeData } from '../utils/AppStorage'
import Interceptor from '../utils/Interceptor'
const LogInUser = (callback, formData) => {

    fetch(EndPoints.LOGIN, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        if (status === 201 || status === 200) {
            Interceptor.setToken(data?.data?.access_token || "");
            let UserObj = { ...data.data.user, ...data?.data?.user?.profile, token: data.data.access_token, email: formData?.userName };

            debugger
            storeData('user', UserObj).then(res => {
                store.dispatch(setUser(UserObj))
                debugger
                callback(UserObj)
            }).catch(err => {
                callback(false)
            })
        } else
            callback(false)
    }).catch((error) => {
        console.log('---------LOGIN ERROR-----------', error)
        callback(false)
    });

}

const SignUpUser = (callback, formedData) => {
    fetch(EndPoints.SIGNUP, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formedData)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------SIGN UP RESPONSE----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true)
        } else {
            AppShowToast(data?.message?.message || data?.message?.response?.message || "Something went wrong, try again later")
            callback(false)
        }
    }).catch((error) => {
        console.log('---------SIGN UP DATA - ERROR-----------', error)
        callback(false)
    });
}

const ForgotPasswordCall = (callback, formedData) => {
    fetch(EndPoints.FORGOT_PASSWORD + '?email=' + formedData, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('---------------FORGOT PASS RES-------------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true)
        } else {
            AppShowToast(data?.message?.message || "Please try again later")
            callback(false)
        }
    }).catch((error) => {
        console.log('---------SIGN UP DATA - ERROR-----------', error)
        callback(false)
    });
}

const ChangePassword = (callback, formedData) => {
    fetch(EndPoints.CHANGE_PASSWORD, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formedData)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('---------------CHANGE PASS RES-------------', data)
        if (status === 201 || status === 200) {
            callback(true)
        } else {
            AppShowToast(data?.message?.message || "Wrong password provided")
            callback(false)
        }
    }).catch((error) => {
        console.log('--------- CHANGE PASS - ERROR-----------', error)
        callback(false)
    });
}

const LogOutUser = (callback) => {
    getData('rememberMe', (dta) => {
        if (dta) {
            removeItemsFromLocalStorage(['user']);
        } else {
            clearStorage().then(res => callback(true)).then(err => {
                console.log('-------ERROR LOGGIN OUT AND CLEARING STORAGE----------\n', err)
            })
        }
        store.dispatch(resetUser())
        store.dispatch(resetHomeFeed())
        store.dispatch(resetSavedPosts())
        callback(false)
    })

}
export { LogInUser, SignUpUser, LogOutUser, ChangePassword, ForgotPasswordCall }
