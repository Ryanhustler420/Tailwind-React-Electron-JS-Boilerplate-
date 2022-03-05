import { TYPES } from "../actions/types";
import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit';

function createApplicationStateReducer() {

    const INITIAL_STATE = {
        isNetworkIssue: false,
        isLoadingPanel: false,
    }

    const bucket = createReducer(INITIAL_STATE, {
        [TYPES.HIDE_NETWORK_ISSUE_PANEL]: (state, action) => { state['isNetworkIssue'] = false; },
        [TYPES.SHOW_NETWORK_ISSUE_PANEL]: (state, action) => { state['isNetworkIssue'] = true; },
        [TYPES.HIDE_LOADING_PANEL]: (state, action) => { state['isLoadingPanel'] = false; },
        [TYPES.SHOW_LOADING_PANEL]: (state, action) => { state['isLoadingPanel'] = true; },
    });

    // state example { from: '/login', to: '/', consume: false, goBack: false, afterRedirectCanGoBack: false }
    const redirection = createReducer({}, {
        [TYPES.CREATE_NEW_REDIRECT_REQUEST]: (state, action) => {
            const { initialize: { from, to, consume } } = action;
            state[from] = { to, consume }
        },
        [TYPES.CONSUME_REDIRECT_REQUEST_SUCCESSFULLY]: (state, action) => {
            const { update: { from, consume } } = action;
            state[from] = { ...state[from], consume }
        },
    })

    const SIDE_NAV_OPTIONS_INITAIL_STATE = {
        settingsPermission: true,
        logoutPermission: true,
    }

    const sideNavOptions = createReducer(SIDE_NAV_OPTIONS_INITAIL_STATE, {
        [TYPES.REMOVE_SETTINGS_PERMISSION]: (state, action) => {
            state['settingsPermission'] = false;
        },
        [TYPES.GIVE_SETTINGS_PERMISSION]: (state, action) => {
            state['settingsPermission'] = true;
        },
        [TYPES.REMOVE_LOGOUT_PERMISSION]: (state, action) => {
            state['logoutPermission'] = false;
        },
        [TYPES.GIVE_LOGOUT_PERMISSION]: (state, action) => {
            state['logoutPermission'] = true;
        },
        [TYPES.RESET_OPTION_PERMISSIONS_TO_DEFAULT]: (state, action) => {
            state['settingsPermission'] = true;
            state['logoutPermission'] = true;
        },
    });

    return combineReducers({ bucket, redirection, sideNavOptions });

}

export default createApplicationStateReducer()