import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

import rootReducer from './redux/index';

export default createStore(
    rootReducer,
    applyMiddleware([
        thunkMiddleware.withExtraArgument({ axios }),
        createLogger({ collapsed: true }),
    ])
)