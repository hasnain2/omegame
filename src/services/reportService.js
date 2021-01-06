import { JSONBodyHelper } from '.';
import { EndPoints } from '../utils/AppEndpoints';
import { AppLogger } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';

async function ReportIssueOrSpam(PAYLOAD) {
    return fetch(`${EndPoints.REPORT}`, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(PAYLOAD)
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------REPORT RES--------------', JSON.stringify(data))
        debugger
        if (status === 201 || status === 200) {
            return data
        } else
            return false

    }).catch((error) => {
        AppLogger('---------REPORT ERROR---------------', error)
        return false
    });
}

export { ReportIssueOrSpam };

