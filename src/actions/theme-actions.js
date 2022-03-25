import { TYPES } from './types';

export const setNightTheme = () => dispatch => dispatch({ type: TYPES.SET_DEFAULT_THEME_TO_NIGHT });
export const setDayTheme = () => dispatch => dispatch({ type: TYPES.SET_DEFAULT_THEME_TO_DAY });