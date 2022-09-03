/**
 * NOTE: middleware gets called everytime you dispatch any action
 * NOTE: Do not mess with data which are going to receive by any reducer, BAD PRACTICE
 */

import { TYPES } from '../../actions/types';

/** (param) store:: get state of the application */
/** (param) next:: helps to proceed further in the funnel to next middleware when get call */
/** (param) action:: which we are dispatching  */
const o = (store) => (next) => (action) => {

    // const DataBucket = store.getState();

    switch (action?.type) {
        case TYPES.RESET_ALL_STATES:
            // unsubscribing if any listeners is present in the app to prevent memory leaks
            break;
        default:
            break
    }
    next(action) // goes to next middleware, if has any!
};
export default o;