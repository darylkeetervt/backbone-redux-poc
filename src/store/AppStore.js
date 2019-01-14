import { createStore } from 'redux';

function filter(state = {currentFilter: ''}, action = { type: 'NOOP' }) {
    switch (action.type) {
        case 'FILTER':
            console.log('updating filter');
            return { ...state, currentFilter: action.entry };
        default:
            return state;
    }
}

export const store = createStore(
    filter,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
