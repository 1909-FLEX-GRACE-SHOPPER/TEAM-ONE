import { combineReducers } from 'redux';
import {
    products,
    singleProduct,
    user,
    orders,
} from './reducers';

export default combineReducers({
    products,
    singleProduct,
    user,
    orders,
});