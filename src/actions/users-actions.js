import BROWSER_STORAGE from '../utils/BrowserStorage';
import * as LOCAL from '../Local/LocalCache';
import * as API from '../apis/apis';
import { TYPES } from './types';
import _ from 'lodash';

import { handleStatus, handleNetworkError } from './common-actions';
import { redirectTo } from './application-state-actions';
import { Toast } from '../utils/Toast';

// retrieve from browser when recently login
async function getBrowserCookie(cookie_name) {
    const cookie = new Promise((resolve, reject) => {
        window.electron?.cookies.getCookie.openL(cookie => { // hook listener (1)
            const single = _.find(cookie, ['name', cookie_name])
            window.electron?.cookies.getCookie.closeL();
            resolve(single);
        });
        window.electron?.cookies.getCookie.send(cookie_name); // send signal
    });
    return await cookie;
}

export const login = (email, password) => async dispatch => {
    dispatch({ type: TYPES.SHOW_LOADING_PANEL })
    return API.loginUser(email, password).then(response => {
        if (!_.isUndefined(response)) {
            BROWSER_STORAGE.userIsNowLoggedIn();
            // dispatch(setCurrentDeviceToLoggedIn());
            LOCAL.saveCurrentUser(response.data.document);
            dispatch({ type: TYPES.SAVE_USER_DOCUMENT, user: response.data.document })
            dispatch({ type: TYPES.HIDE_LOADING_PANEL })
            getBrowserCookie('app-name-cookie').then((cookie) => {
                window.electron?.cookies.persistCookie.send(cookie);
                dispatch({ type: TYPES.HIDE_LOADING_PANEL })
                dispatch({ type: TYPES.SAVE_COOKIE_DETAILS, cookie })
            }).catch(console.error);
        } else {
            dispatch({ type: TYPES.HIDE_LOADING_PANEL })
        }
    }).catch(reason => {
        dispatch({ type: TYPES.HIDE_LOADING_PANEL })
        dispatch(handleNetworkError(reason?.message));
        dispatch(handleStatus(reason.response?.status));
        Toast.bottom_center.stage('error', reason.response?.data.message || reason.message);
    })
}

export const updateUserDocumentFromCache = () => dispatch => {
    getCacheUser().then(response => {
        dispatch({ type: TYPES.UPDATE_USER_DOCUMENT, user: response });
    }).catch(err => dispatch(handleStatus(401)));
}

async function getCacheUser() {
    const user = new Promise((resolve, reject) => {
        LOCAL.getCachedUser(user => {
            if (typeof user == 'object') {
                if (Object.keys(user)?.length == 0) return reject(undefined); else return resolve(user);
            } else if (Object.keys(JSON.parse(user))?.length == 0) return reject(undefined);
            return resolve(JSON.parse(user));
        })
    });
    return await user;
}

export const register = (locationPathname, User = {}) => dispatch => {
    dispatch({ type: TYPES.SHOW_LOADING_PANEL })
    return API.registerNewUser(User).then(response => {
        dispatch({ type: TYPES.HIDE_LOADING_PANEL })
        dispatch(redirectTo(locationPathname, '/login'));
        // dispatch({ type: TYPES.UPDATE_USER_DOCUMENT, user: response.data.document })
    }).catch(reason => {
        dispatch({ type: TYPES.HIDE_LOADING_PANEL })
        dispatch(handleNetworkError(reason?.message));
        dispatch(handleStatus(reason.response?.status));
        Toast.bottom_center.stage('error', reason.response?.data.message || reason.message);
    })
}

export const getLoggedInUser = () => dispatch => {
    return API.getCurrentLoggedInUser().then(response => {
        dispatch({ type: TYPES.UPDATE_USER_DOCUMENT, user: response.data.document })
    }).catch(reason => {
        dispatch(handleNetworkError(reason?.message));
        dispatch(handleStatus(reason.response?.status));
        Toast.bottom_center.stage('error', reason.response?.data.message || reason.message);
    });
}

export const updateUserDetails = (UserUpdateInfo = {}) => dispatch => {
    return API.updateUserProfile(UserUpdateInfo).then(response => {
        // dispatch... response.data.message
    }).catch(reason => {
        dispatch(handleNetworkError(reason?.message));
        dispatch(handleStatus(reason.response?.status));
        Toast.bottom_center.stage('error', reason.response?.data.message || reason.message);
    });
}

export const logout = (user) => dispatch => {
    dispatch({ type: TYPES.SHOW_LOADING_PANEL })
    return API.logout().then(response => {
        window.electron?.db.clearAll.send();
        BROWSER_STORAGE.resetAll(user);
        window.electron?.cookies.persistCookie.send("");
        dispatch({ type: TYPES.RESET_ALL_STATES })
        dispatch({ type: TYPES.HIDE_LOADING_PANEL })
        dispatch({ type: TYPES.UPDATE_COOKIE_DETAILS, cookie: "" })
    }).catch(reason => {
        dispatch({ type: TYPES.HIDE_LOADING_PANEL })
        dispatch(handleNetworkError(reason?.message));
        dispatch(handleStatus(reason.response?.status));
        Toast.bottom_center.stage('error', reason.response?.data.message || reason.message);
    })
}
