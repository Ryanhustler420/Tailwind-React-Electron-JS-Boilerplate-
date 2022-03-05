import { TYPES } from './types';
import _ from 'lodash';

export const updateSessionFromCache = () => dispatch => {
    dispatch({ type: TYPES.SHOW_LOADING_PANEL });
    getCachedCookie().then(response => {
        dispatch({ type: TYPES.UPDATE_COOKIE_DETAILS, cookie: response });
        dispatch({ type: TYPES.HIDE_LOADING_PANEL });
    }).catch(err => dispatch({ type: TYPES.HIDE_LOADING_PANEL }));
}

// retrieve from local file
async function getCachedCookie() {
    const cookie = new Promise((resolve, reject) => {
        window.electron.cookies.retrieveCookie.openL(cookie => {
            if (!_.isUndefined(cookie)) {
                let cc = cookie;
                if (typeof (cookie) == 'string') cc = JSON.parse(cookie);
                if (_.has(cc, 'name') && _.has(cc, 'value')) resolve(cc);
                else reject(undefined);
            }
            window.electron.cookies.retrieveCookie.closeL();
        });
        window.electron.cookies.retrieveCookie.send();
    });
    return await cookie;
}
