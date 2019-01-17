import { createStore, applyMiddleware, compose } from 'redux';
import { notifyViews } from './middleware';

export const store = createStore(
    (state = {}) => state,
    compose(
        applyMiddleware(notifyViews),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
