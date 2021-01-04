import appleAuth, {
    AppleAuthRequestOperation, AppleAuthRequestScope
} from '@invertase/react-native-apple-authentication';
import {
    GoogleSignin
} from '@react-native-community/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { JSONBodyHelper } from '.';
import { SOCIAL_LOGIN_TYPES } from '../utils/AppConstants';
import { EndPoints } from '../utils/AppEndpoints';
import { AppLogger } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';

async function socialloginhelper(token, type) {
    AppLogger('------GOT TOKEN FROM ' + type, token)
    debugger
    fetch(`${EndPoints.SOCIAL_LOGIN}`, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({ token, type })
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------SOCIAL LOGIN RES----------' + type + '----', JSON.stringify(data))
        if (status === 201 || status === 200) {
            return true
        } else
            return false
    }).catch((error) => {
        AppLogger('---------SOCIAL LOGIN ERROR-----------' + type + '----', error)
        return false
    });
}

const LoginWithFacebook = async () => {
    try {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            async function (result) {
                if (result.isCancelled) {
                    return false
                } else {
                    AccessToken.getCurrentAccessToken().then(async data => {
                        try {
                            return await socialloginhelper(data.accessToken, SOCIAL_LOGIN_TYPES.FACEBOOK);
                        } catch (errr) {
                            AppLogger('-----------ERROR WHILE GETTING-----------', errr)
                        }
                    });
                }
            },
            function (error) {
                AppLogger("Login fail with error: ", error);
            }
        );
        return true;
    } catch (err) {
        AppLogger('---------LOGIN WITH FACEBOOK----ERROR-----\n', err);
        return false;
    }
}

const LoginWithApple = async () => {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
        });

        if (!appleAuthRequestResponse.identityToken) {
            alert('Unable to login please try again latter')
        } else {
            let { identityToken, nonce, email, fullName } = appleAuthRequestResponse;
            fullName = fullName.givenName;
            // var decoded = JwtDecode(identityToken);
            let newUserObj = {
                email: decoded.email,
                token: identityToken,
            };
            return await socialloginhelper(newUserObj.token, SOCIAL_LOGIN_TYPES.APPLE);
        }
    } catch (err) {
        AppLogger('---------LOGIN WITH APPLE----ERROR-----\n', err);
        return false;
    }
}

const LoginWithTwitter = async () => {
    try {

        return true;
    } catch (err) {
        AppLogger('---------LOGIN WITH TWITTER----ERROR-----\n', err);
        return false;
    }
}

const LoginWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        let newUserObj = {
            email: userInfo.user.email,
            token: userInfo.idToken,
            userId: userInfo.user.id
        };
        debugger
        return await socialloginhelper(newUserObj.token, SOCIAL_LOGIN_TYPES.GOOGLE);
    } catch (err) {
        AppLogger('---------LOGIN WITH GOOGLE----ERROR-----\n', err);
        return false;
    }
}
const LoginWithInstagram = async () => {
    try {

        return true;
    } catch (err) {
        AppLogger('---------LOGIN WITH INSTAGRAM----ERROR-----\n', err);
        return false;
    }
}

export { LoginWithFacebook, socialloginhelper, LoginWithApple, LoginWithGoogle, LoginWithTwitter, LoginWithInstagram };

