// simple dispatch, since this method i.e action will be called by dispatch, it will work just fine

import { TYPES } from "./types"

export const updateSettings = (setting, value) => {
    return {
        type: TYPES.UPDATE_SETTINGS,
        setting,
        value
    }
}

export const loadInitialSettings = (setting, value) => {
    return { type: TYPES.LOAD_INITIAL_SETTINGS_FROM_CACHED }
}

export const updateSettingsToggleShowNotifications = () => ({ type: TYPES.UPDATE_SETTINGS_TOGGLE_SHOW_NOTIFICATIONS })
export const updateSettingsShowNotifications = (value = false) => ({ type: TYPES.UPDATE_SETTINGS_SHOW_NOTIFICATIONS, value })
export const updateSettingsImagePadding = (value = { padLeft: 50, padTop: 50, padRight: 50, padBottom: 50 }) => ({ type: TYPES.UPDATE_SETTINGS_IMAGE_PADDING, value })
export const updateSettingsDarkTheme = (value = false) => ({ type: TYPES.UPDATE_SETTINGS_DARK_THEME, value })
export const updateSettingsPlaySound = (value = false) => ({ type: TYPES.UPDATE_SETTINGS_PLAY_SOUND, value })