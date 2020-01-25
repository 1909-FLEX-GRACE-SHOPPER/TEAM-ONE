import { combineReducers } from 'redux';

import {
    products,
    singleProduct,
    user,
    orders,
    orderDetails,
    authenticationError,
} from './reducers';

export default combineReducers({
    products,
    singleProduct,
    user,
    orders,
    orderDetails,
    authenticationError,
});