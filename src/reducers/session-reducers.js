import { TYPES } from "../actions/types";
import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit';

function createSessionReducer() {
    // Change this will affect the application, not recommended for auto flow
    const INITIAL_STATE = {
        cookie: ''
    }

    // please dont make this reducer async function, else it will return a promise
    const infos = createReducer(INITIAL_STATE, {
        [TYPES.SAVE_COOKIE_DETAILS]: (state, action) => {
            const { cookie } = action;
            state['cookie'] = cookie;
        },
        [TYPES.UPDATE_COOKIE_DETAILS]: (state, action) => {
            const { cookie } = action;
            state['cookie'] = cookie;
        }
    });
    return combineReducers({ infos });
}

export default createSessionReducer()