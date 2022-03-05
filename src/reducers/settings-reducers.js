import BROWSER_STORAGE from '../utils/BrowserStorage';
import { combineReducers } from 'redux';
import { TYPES } from '../actions/types';

function createSettingsReducer() {

    const INITIAL_STATE = {
        imagePadding: { padLeft: 50, padTop: 50, padRight: 50, padBottom: 50 },
        showNotifications: true,
        darkTheme: false,
        playSound: true,
        saveable: true,
    }

    const settings = (state = INITIAL_STATE, action) => {
        const { setting, value } = action;
        switch (action?.type) {
            case TYPES.UPDATE_SETTINGS:
                return { ...state, [setting]: value }
            case TYPES.UPDATE_SETTINGS_SHOW_NOTIFICATIONS:
                return { ...state, showNotifications: value };
            case TYPES.UPDATE_SETTINGS_IMAGE_PADDING:
                return { ...state, imagePadding: value };
            case TYPES.UPDATE_SETTINGS_DARK_THEME:
                return { ...state, darkTheme: value };
            case TYPES.UPDATE_SETTINGS_PLAY_SOUND:
                return { ...state, playSound: value };
            case TYPES.LOAD_INITIAL_SETTINGS_FROM_CACHED:
                return {
                    ...state,
                    showNotifications: BROWSER_STORAGE.getNotifiationStatus() ? BROWSER_STORAGE.getNotifiationStatus() === 'true' : true,
                    imagePadding: BROWSER_STORAGE.getPaddingSet() ? BROWSER_STORAGE.getPaddingSet() : { padLeft: 50, padTop: 50, padRight: 50, padBottom: 50 },
                    darkTheme: BROWSER_STORAGE.getDarkThemeStatus() ? BROWSER_STORAGE.getDarkThemeStatus() === 'true' : false,
                    playSound: BROWSER_STORAGE.getSoundStatus() ? BROWSER_STORAGE.getSoundStatus() === 'true' : true,
                }
            default:
                return state;
        }
    }

    return combineReducers({
        bucket: settings
    })
}

export default createSettingsReducer()