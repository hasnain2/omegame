
import { AppLogger } from '../utils/AppHelperMethods';

const LoginWithFacebook = async () => {
    try {

        return true;
    } catch (err) {
        AppLogger('---------LOGIN WITH FACEBOOK----ERROR-----\n', err);
        return false;
    }
}

const LoginWithApple = async () => {
    try {

        return true;
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

        return true;
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

export { LoginWithFacebook, LoginWithApple, LoginWithGoogle, LoginWithTwitter, LoginWithInstagram };

