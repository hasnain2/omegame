import { JSONBodyHelper } from '.'
import { EndPoints } from '../utils/AppEndpoints'
import { AppLogger } from '../utils/AppHelperMethods'
import Interceptor from '../utils/Interceptor'
const SetAppSettings = (callback, formData) => {

    fetch(EndPoints.APP_SETTINGS_SET_OR_GET, {
        method: 'PATCH',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('---------SET APP SETTINGS-- ERROR-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(true);
        } else
            callback(false)
    }).catch((error) => {
        AppLogger('---------SET APP SETTINGS-- ERROR-----------', error)
        callback(false)
    });

}

const GetAppSettings = (callback) => {
    fetch(EndPoints.APP_SETTINGS_SET_OR_GET, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------GET APP SETTINGS RESPONSE----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data)
        } else {
            callback(false)
        }
    }).catch((error) => {
        AppLogger('---------GET APP SETTINGS DATA - ERROR-----------', error)
        callback(false)
    });
}

export { SetAppSettings, GetAppSettings }
