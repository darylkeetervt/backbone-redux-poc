import { createStore } from 'redux';
import appReducers from './combinedReducers';

export const store = createStore(
    appReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
