import _ from "lodash";

const APP_NAME = "app_name";
const PACKAGE_NAME = "IO.DOMAIN.APP_NAME";

const savedUser = PACKAGE_NAME + "SAVED_USER";

// ********************************
// ********************************

export const getCachedUser = (cb) => {
    window.electron?.db.getCachedUser.openL(user => {
        window.electron?.db.getCachedUser.closeL();
        if (typeof user == 'string') cb(JSON.parse(user));
        else cb(user);
    });
    window.electron?.db.getCachedUser.send(savedUser);
}

export const saveCurrentUser = (user) => {
    window.electron?.db.saveCurrentUser.send(savedUser, user);
}

// ********************************
// ********************************

export const hasUserDataReady = (cb) => {
    cb(true);
}

export const allDataDownloaded = (cb) => {
    cb(true);
}

// ********************************
// ********************************