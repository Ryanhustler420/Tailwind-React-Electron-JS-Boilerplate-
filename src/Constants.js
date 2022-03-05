export const DEV = "dev";
export const PROD = "prod";

// ***********************
export const APP_RELEASE_VERSION = 7; // always increase when releasing new package
export const SERVER_VERSION_CODE = 1; // always increase when adding new routes/feature along with server code, so that application look for latest server release
// ***********************

export const WEBSITE_URL = "www.example.com";
export const APP_NAME = "app_name";
export const CEO_NAME = "your_name";
export const APP_VERSION = "v1";

export const PROJECT_NAME = "electron_app_name";
export const PACKAGE_NAME_FOR_LOCAL_STORAGE = "IO.DOMAIN.APP_NAME";

//******************************************//
//******PLEASE CHANGE THIS*******//

export let rootNode = window.electron?.appApi?.is_dev ? DEV : PROD;
console.log('rootNode', rootNode);

export const isProd = () => rootNode === PROD;
export const getEnv = () => isProd() ? PROD : DEV;

export let BACKEND_API_BASE_URL = isProd() ?  /* for live digital ocean Server Instance */  "https://www.example.com/"  /* for (node.js) Localhost via emulator*/ : "http://localhost:3002/";
export let TLD = isProd() ? "example.com" : "localhost:3002";

// time format
export const COMPLETE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

// REGEX EXPRESSION
export const REGEX_ONLY_NUMBER = "^[0-9]*$"; // "^[0-9.]*$";
export const NUMBER_AND_DECIMAL_REGEX = "^\\d*\\.\\d+|\\d+\\.\\d*$";
export const PASSWORD_REGEX = "(?=.*[a-z])(?=.*[A-Z])(?=.*[\\d])(?=.*[~`!@#\\$%\\^&\\*\\(\\)\\-_\\+=\\{\\}\\[\\]\\|\\;:\"<>,./\\?]).{8,}";
export const NO_SPECIAL_CHARACTER_REGEX = /^[^*|\":<>[\]{}`\\()';@&$]+$/;

export const IMAGE_EXTENSION = ".jpg";

// platforms
export const PLATFORM_WINDOWS = "windows";
export const PLATFORM_DESKTOP = "desktop";
export const PLATFORM_ANDROID = "android";
export const PLATFORM_OTHER = "other";
export const PLATFORM_IOS = "ios";

// genders
export const All = "All";
export const Male = "Male";
export const Female = "Female";
export const Other = "Other";