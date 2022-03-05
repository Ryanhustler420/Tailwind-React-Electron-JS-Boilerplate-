import BROWSER_STORAGE from '../utils/BrowserStorage';
import * as LOCAL from '../Local/LocalCache';
import { Toast } from '../utils/Toast';
import { TYPES } from './types';
import _ from 'lodash';

export const handleStatus = (statusCode) => dispatch => {
    switch (statusCode) {
        case 401: // UnAuthorized
            dispatch({ type: TYPES.RESET_ALL_STATES })
            dispatch({ type: TYPES.UPDATE_COOKIE_DETAILS, cookie: "" })
            Toast.bottom_center.stage('error', 'User was logged out');
            window.electron.cookies.persistCookie.send("");
            window.electron.db.clearAll.send();
            // since we are not getting user details from method params, we are retrieveing from cache
            LOCAL.getCachedUser(user => BROWSER_STORAGE.resetAll(user));
            break;
        case 426: // UpdateRequired
            Toast.bottom_center.stage('danger', 'Please update your application, or wait until the application gets updated');
            break;
        case 501: // NotImplemented
            Toast.bottom_center.stage('danger', 'Please wait while server is getting ready for you');
            break;
        case 502: // Bad Request (Lost Host)
            Toast.bottom_center.stage('danger', 'Server is under maintenance, it might take few minutes');
            break;
        case 406: // Not Acceptable
            Toast.bottom_center.stage('danger', 'This action is not acceptable');
            break;
        default:
            break;
    }
}

export const handleNetworkError = (errorMessage = '') => dispatch => {
    if (_.isEqual(errorMessage, 'Network Error')) {
        dispatch({ type: TYPES.SHOW_NETWORK_ISSUE_PANEL });
        // more code command here...
    }
}