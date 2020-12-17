import { EndPoints } from '../utils/AppEndpoints';
import Interceptor from '../utils/Interceptor';
const LIMIT = 50;
function GetAssets(callback, CURSOR) {
    fetch(EndPoints.GET_GAMES_LIST, {
        method: 'GET',
        headers: Interceptor.getHeaders(),
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GAMES LIST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GAMES LIST ERROR-----------', error)
        callback(false)
    });
}

export {
    GetAssets,
};
