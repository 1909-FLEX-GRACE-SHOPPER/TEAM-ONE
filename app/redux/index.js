import { combineReducers } from 'redux';

import {
    products,
    singleProduct,
    user,
    orders,
    orderDetails,
    authentication,
} from './reducers';

export default combineReducers({
    products,
    singleProduct,
    user,
    orders,
    orderDetails,
    authentication,
});