import { firebase } from '@react-native-firebase/messaging'
import { JSONBodyHelper } from '.'
import { resetFriends } from '../redux/reducers/friendsSlice'
import { resetGameReviews } from '../redux/reducers/gameReviewsSlice'
import { resetHomeFeed } from '../redux/reducers/homeFeedSlice'
import { resetInbox } from '../redux/reducers/inboxSlice'
import { resetMyAssets } from '../redux/reducers/myAssetsSlice'
import { resetNotifications } from '../redux/reducers/notificationsSlice'
import { resetQuests } from '../redux/reducers/questsSlice'
import { resetSavedPosts } from '../redux/reducers/savedPostsSlice'
import { resetUserProfileData } from '../redux/reducers/userProfileDataSlice'
import { resetUser, setUser } from '../redux/reducers/userSlice'
import { store } from '../redux/store'
import { EndPoints } from '../utils/AppEndpoints'
import { AppLogger, AppShowToast, CapitalizeFirstLetter } from '../utils/AppHelperMethods'
import { clearStorage, getData, removeItemsFromLocalStorage, storeData } from '../utils/AppStorage'
import Interceptor from '../utils/Interceptor'

const SetUpUserAndToken = async (data) => {
    Interceptor.setToken(data?.access_token || "");
    const UserObj = { ...data?.user, ...data?.user?.profile, token: data?.access_token };
    if (UserObj?._id)
        firebase.messaging().subscribeToTopic(UserObj?._id);
    storeData('user', UserObj).then(res => {
        store.dispatch(setUser(UserObj))
        return UserObj
    }).catch(err => {
        return false
    })
}

const LogInUser = (callback, formData) => {
    fetch(EndPoints.LOGIN, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then(JSONBodyHelper).then(async ([status, data]) => {
        if (status === 201 || status === 200) {
            const res = await SetUpUserAndToken(data?.data);
            if (res)
                callback(res)
            else
                callback(false)
        } else
            callback(false)
    }).catch((error) => {
        callback(false)
    });
}

const ResetPasswordService = async (body) => {
    return await fetch(EndPoints.RESET_PASSWORD, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(body)
    }).then(JSONBodyHelper).then(async ([status, data]) => {
        AppLogger('---------------RESET PASSWORD RESPONSE-------------', data)
        debugger
        if (status === 201 || status === 200) {
            AppShowToast("Password has been updated!")
            const res = await SetUpUserAndToken(data?.data);
            return true
        } else {
            AppShowToast(data?.message?.message || "try again later")
            return false
        }
    }).catch((error) => {
        AppLogger('--------- RESET PASSWORD - ERROR-----------', error)
        return false
    });
}

const SignUpUser = (callback, formedData) => {
    fetch(EndPoints.SIGNUP, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formedData)
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------SIGN UP RESPONSE----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true)
        } else {
            AppShowToast(data?.message?.message || data?.message?.response?.message || "Something went wrong, try again later")
            callback(false)
        }
    }).catch((error) => {
        AppLogger('---------SIGN UP DATA - ERROR-----------', error)
        callback(false)
    });
}

const ForgotPasswordCall = (callback, formedData) => {
    fetch(EndPoints.FORGOT_PASSWORD + '?email=' + formedData, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('---------------FORGOT PASS RES-------------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true)
        } else {
            AppShowToast(CapitalizeFirstLetter(data?.message?.message || "Please try again later"))
            callback(false)
        }
    }).catch((error) => {
        AppLogger('---------SIGN UP DATA - ERROR-----------', error)
        callback(false)
    });
}

const ChangePassword = (callback, formedData) => {
    fetch(EndPoints.CHANGE_PASSWORD, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formedData)
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('---------------CHANGE PASS RES-------------', data)
        if (status === 201 || status === 200) {
            callback(true)
        } else {
            AppShowToast(data?.message?.message || "Wrong password provided")
            callback(false)
        }
    }).catch((error) => {
        AppLogger('--------- CHANGE PASS - ERROR-----------', error)
        callback(false)
    });
}

const VerifyEmail = async (body) => {
    return await fetch(EndPoints.VERIFY_EMAIL, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(body)
    }).then(JSONBodyHelper).then(async ([status, data]) => {
        AppLogger('---------------EMAIL VERIFICATION RESPONSE-------------', data)
        debugger
        if (status === 201 || status === 200) {
            AppShowToast("Email successfully verified!")
            const res = await SetUpUserAndToken(data?.data);
            return true
        } else {
            AppShowToast(data?.message?.message || "try again later")
            return false
        }
    }).catch((error) => {
        AppLogger('--------- EMAIL VERIFICATION - ERROR-----------', error)
        return false
    });
}

const ResendVerificationCode = async (body) => {
    return await fetch(EndPoints.RESEND_VERIFICATION_CODE, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(body)
    }).then(JSONBodyHelper).then(async ([status, data]) => {
        AppLogger('---------------EMAIL RESEND CODE RESPONSE-------------', data)
        debugger
        if (status === 201 || status === 200) {
            AppShowToast("Verification code sent!")
            return true
        } else {
            AppShowToast(data?.message?.message || "try again later")
            return false
        }
    }).catch((error) => {
        AppLogger('--------- EMAIL RESEND CODE - ERROR-----------', error)
        return false
    });
}

const LogOutUser = async (callback) => {
    try {
        let unsubRes = await firebase.messaging().unsubscribeFromTopic(store.getState()?.root?.user?._id)
    } catch (err) { }

    getData('rememberMe', (dta) => {
        if (dta) {
            removeItemsFromLocalStorage(['user']);
        } else {
            clearStorage().then(res => callback(true)).catch(err => {
                AppLogger('------------CLEARING STORAGE ERROR---------', err)
                callback(false)
            });
        }

        store.dispatch(resetUser())
        store.dispatch(resetHomeFeed())
        store.dispatch(resetSavedPosts())

        store.dispatch(resetFriends())
        store.dispatch(resetGameReviews())
        store.dispatch(resetInbox())
        store.dispatch(resetMyAssets())
        store.dispatch(resetNotifications())
        store.dispatch(resetQuests())
        store.dispatch(resetUserProfileData())

        callback(false)
    })
}

const DeleteUserAccount = (callback) => {
    fetch(EndPoints.DELETE_MY_ACCOUNT, {
        method: 'DELETE',
        headers: Interceptor.getHeaders()
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('---------------ACCOUNT DELETION RES-------------', data)
        if (status === 201 || status === 200) {
            LogOutUser(() => { })
            clearStorage().then(res => callback(true)).catch(err => {
                AppLogger('------------CLEARING STORAGE ERROR---------', err)
                callback(false)
            })
        } else {
            AppShowToast(data?.message?.message || "Wrong password provided")
        }
    }).catch((error) => {
        AppLogger('--------- ACCOUNT DELETION - ERROR-----------', error)
    });
}
export { LogInUser, SignUpUser, ResetPasswordService, ResendVerificationCode, VerifyEmail, LogOutUser, ChangePassword, ForgotPasswordCall, DeleteUserAccount }
