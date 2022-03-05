// Server Routes
import * as Constants from '../Constants';
export const baseUrl = Constants.BACKEND_API_BASE_URL;

export const GET_IC_STATUS = `${baseUrl}v1/ic_status/:ic`;
export const POST_ENV_ELECTRON_USERS_CREATE = `${baseUrl}v1/api/env/electron/users/create`;