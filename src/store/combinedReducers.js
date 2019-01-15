import { combineReducers } from 'redux';
//import * as reducers from '../reducers';

import filter from '../reducers/filter';

const appReducers = combineReducers({
    filter
});

export default appReducers;
