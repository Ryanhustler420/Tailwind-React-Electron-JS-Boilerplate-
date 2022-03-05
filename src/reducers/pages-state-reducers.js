import { TYPES } from "../actions/types";
import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit';

function createPagesStateReducer() {

    const DASHBOARD_PAGE_STATE = {
        hasRenderedOnce: false,
        hasAllowedToRerendered: false,
        hasCachedRepoIdRetrievedOnce: false,
    }

    const dashboardPage = createReducer(DASHBOARD_PAGE_STATE, {
        [TYPES.SET_DASHBOARD_PAGE_HAS_RENDERED]: (state, action) => {
            state['hasRenderedOnce'] = true;
        },
        [TYPES.SET_DASHBOARD_HAS_ALLOWED_TO_RERENDERED]: (state, action) => {
            state['hasAllowedToRerendered'] = true;
        },
        [TYPES.SET_HAS_CACHED_REPO_ID_RETRIEVED_ONCE]: (state, action) => {
            state['hasCachedRepoIdRetrievedOnce'] = true;
        }
    });

    return combineReducers({ dashboardPage });

}

export default createPagesStateReducer()