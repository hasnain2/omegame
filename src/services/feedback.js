import {JSONBodyHelper} from '.';
import {EndPoints} from '../utils/AppEndpoints';
import {AppLogger, AppShowToast} from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';
function PostFeedback(callback, PAYLOAD) {
  fetch(`${EndPoints.POST_FEEDBACK}`, {
    method: 'POST',
    headers: Interceptor.getHeaders(),
    body: JSON.stringify(PAYLOAD),
  })
    .then(JSONBodyHelper)
    .then(([status, data]) => {
      AppLogger('-----------POSTING REVIEW ON GAME----------', JSON.stringify(data));
      if (status === 201 || status === 200) {
        callback(true);
      } else callback(false);
    })
    .catch((error) => {
      AppLogger('---------POSTING REVIEW ON GAME-----------', error);
      callback(false);
    });
}

export {PostFeedback};
