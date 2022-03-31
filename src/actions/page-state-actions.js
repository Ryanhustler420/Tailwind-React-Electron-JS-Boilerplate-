import { TYPES } from './types';

export const setDashboardPageHasRendered = () => dispatch => {
    dispatch({ type: TYPES.SET_DASHBOARD_PAGE_HAS_RENDERED })
}

export const setDashboardIsAllowedToRerendered = () => dispatch => {
    dispatch({ type: TYPES.SET_DASHBOARD_HAS_ALLOWED_TO_RERENDERED })
}

export const setHasCachedRepoIdRetrievedOnce = () => dispatch => {
    dispatch({ type: TYPES.SET_HAS_CACHED_REPO_ID_RETRIEVED_ONCE })
}