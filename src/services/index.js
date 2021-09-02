export * from './PushNotifications/RequestPermissionsService';
export * from './PushNotifications/NotificationMethods';
export * from './authService';
export * from './mediaUploader';
export * from './postService';
export * from './profileService';
export * from './mutateReduxState';
export * from './s3fileupload';
export * from './chatService';
export * from './reportService';
export * from './questService';
export * from './translation/i18';

function JSONBodyHelper(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]);
}
export {JSONBodyHelper};
