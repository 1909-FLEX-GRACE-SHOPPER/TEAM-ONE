import { combineReducers } from 'redux';

import {
    products,
    singleProduct,
    user,
    orders,
    orderDetails,
} from './reducers';

export default combineReducers({
    products,
    singleProduct,
    user,
    orders,
    orderDetails,
});