// import { TYPES } from "../actions/types";
import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit';

function createPagesErrorStateReducer() {

    const COMMON_ERROR_STATE = {}
    const commonErrorState = createReducer(COMMON_ERROR_STATE, {});

    const DASHBOARD_PAGE_ERROR_STATE = {}
    const dashboardPageErrorState = createReducer(DASHBOARD_PAGE_ERROR_STATE, {});

    const LOGIN_PAGE_ERROR_STATE = {};
    const loginPageErrorState = createReducer(LOGIN_PAGE_ERROR_STATE, {});

    const REGISTER_PAGE_ERROR_STATE = {};
    const registerPageErrorState = createReducer(REGISTER_PAGE_ERROR_STATE, {});

    return combineReducers({ commonErrorState, loginPageErrorState, dashboardPageErrorState, registerPageErrorState });

}

export default createPagesErrorStateReducer()