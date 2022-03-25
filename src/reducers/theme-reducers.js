import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit';
import { day, night } from '../configs/themes';
import { TYPES } from './../actions/types';

function createThemeReducer() {
    // Change this will affect the application, not recommended for auto flow
    const INITIAL_STATE = night;

    // please dont make this reducer async function, else it will return a promise
    const components = createReducer(INITIAL_STATE, {
        [TYPES.SET_DEFAULT_THEME_TO_NIGHT]: (state, action) => {
            state['threeVerticalPaneAllotment'] = night['threeVerticalPaneAllotment'];
            state['defaultPaneContainers'] = night['defaultPaneContainers'];
            state['singleShopProductPage'] = night['singleShopProductPage'];
            state['singleCompanyPage'] = night['singleCompanyPage'];
            state['defaultLayout'] = night['defaultLayout'];
            state['dashboardPage'] = night['dashboardPage'];
            state['bigBrandLogo'] = night['bigBrandLogo'];
            state['myStocksPage'] = night['myStocksPage'];
            state['libraryPage'] = night['libraryPage'];
            state['messageBox'] = night['messageBox'];
            state['loginPage'] = night['loginPage'];
            state['tabsPane'] = night['tabsPane'];
            state['Toast'] = night['Toast'];
            state['meta'] = night['meta'];
        },
        [TYPES.SET_DEFAULT_THEME_TO_DAY]: (state, action) => {
            state['threeVerticalPaneAllotment'] = day['threeVerticalPaneAllotment'];
            state['defaultPaneContainers'] = day['defaultPaneContainers'];
            state['singleShopProductPage'] = day['singleShopProductPage'];
            state['singleCompanyPage'] = day['singleCompanyPage'];
            state['defaultLayout'] = day['defaultLayout'];
            state['dashboardPage'] = day['dashboardPage'];
            state['bigBrandLogo'] = day['bigBrandLogo'];
            state['myStocksPage'] = day['myStocksPage'];
            state['libraryPage'] = day['libraryPage'];
            state['messageBox'] = day['messageBox'];
            state['loginPage'] = day['loginPage'];
            state['tabsPane'] = day['tabsPane'];
            state['Toast'] = day['Toast'];
            state['meta'] = day['meta'];
        }
    });
    return combineReducers({ components });
}

export default createThemeReducer()