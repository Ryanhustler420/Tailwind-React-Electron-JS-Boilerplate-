import { TYPES } from "../actions/types";
import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit';

function createPagesFetchStateReducer() {

    const COMMON_FETCH_STATE = {}
    const commonFetchState = createReducer(COMMON_FETCH_STATE, {});

    const DASHBOARD_PAGE_FETCH_STATE = {}
    const dashboardPageFetchState = createReducer(DASHBOARD_PAGE_FETCH_STATE, {});

    const LOGIN_PAGE_FETCH_STATE = {};
    const loginPageFetchState = createReducer(LOGIN_PAGE_FETCH_STATE, {});

    const REGISTER_PAGE_FETCH_STATE = {};
    const registerPageFetchState = createReducer(REGISTER_PAGE_FETCH_STATE, {});

    return combineReducers({ commonFetchState, loginPageFetchState, dashboardPageFetchState, registerPageFetchState });

}

export default createPagesFetchStateReducer()