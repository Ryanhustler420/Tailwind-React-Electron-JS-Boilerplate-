import { TYPES } from "../actions/types";
import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit';
import { createErrorReducer, createIsFetchingReducer } from './common-reducers';

// Just a way for creating reducers
const createLoginStateReducer = () => combineReducers({
    isChecking: createIsFetchingReducer('USER_LOGIN_FETCHING'),
    error: createErrorReducer('USER_LOGIN_FETCHING')
})

const createRegisterStateReducer = () => combineReducers({
    isChecking: createIsFetchingReducer('USER_REGISTER_FETCHING'),
    error: createErrorReducer('USER_REGISTER_FETCHING')
})

function createUsersReducer() {

    const user = (state = null, action) => {
        switch (action?.type) {
            case TYPES.UPDATE_USER_DOCUMENT:
            case TYPES.SAVE_USER_DOCUMENT:
                return action.user
            default:
                return state
        }
    };

    const INITIAL_STATE_FOR_USER_FIELDS = {
        notifications: [],
    }

    const field = createReducer(INITIAL_STATE_FOR_USER_FIELDS, {
        [TYPES.SAVE_USER_NOTIFICATIONS]: (state, action) => {
            const { notifications } = action;
            state['notifications'] = notifications;
        },
    });

    return combineReducers({
        user,
        field,
        loginFormState: createLoginStateReducer(),
        registerFormState: createRegisterStateReducer(),
        isChecking: createIsFetchingReducer('USER_LOGIN_FETCHING'),
    });

}

export default createUsersReducer()