import { routes } from '../configs/routes';
import { TYPES } from './types';

export const showLoadingPanel = () => dispatch => dispatch({ type: TYPES.SHOW_LOADING_PANEL })
export const hideLoadingPanel = () => dispatch => dispatch({ type: TYPES.HIDE_LOADING_PANEL })

export const enableLogoutOption = () => dispatch => dispatch({ type: TYPES.GIVE_LOGOUT_PERMISSION });
export const diableLogoutOption = () => dispatch => dispatch({ type: TYPES.REMOVE_LOGOUT_PERMISSION });

export const showNetworkIssuePanel = () => dispatch => dispatch({ type: TYPES.SHOW_NETWORK_ISSUE_PANEL })
export const hideNetworkIssuePanel = () => dispatch => dispatch({ type: TYPES.HIDE_NETWORK_ISSUE_PANEL })

export const resetOptionPermissionsToDefault = () => dispatch => dispatch({ type: TYPES.RESET_OPTION_PERMISSIONS_TO_DEFAULT });

export const redirectTo = (from = routes['/login'].path, to = routes['/'].path) => dispatch => dispatch({ type: TYPES.CREATE_NEW_REDIRECT_REQUEST, initialize: { from, to, consume: false } });
export const redirectConsume = (from = routes['/login'].path, consume = true) => dispatch => dispatch({ type: TYPES.CONSUME_REDIRECT_REQUEST_SUCCESSFULLY, update: { from, consume } });