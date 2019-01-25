import { store } from '../store/AppStore';

const initialState = {
    currentlyFetching: []
};

/**
 * Fetches a backbone collection and dispatches events to
 * prevent multiple views from fetching the same collection if
 * it is currently being fetched.
 *
 * This requires that a collectionName property is set on the collection.
 * @param {object} collection
 */
export const fetchCollection = (collection) => {
    const name = collection.collectionName.toUpperCase();
    if (!store.getState().fetch.currentlyFetching.includes(name)){
        store.dispatch({ type: 'FETCH_START', payload: name });
        collection.fetch({
            success: () => store.dispatch({type: 'FETCH_COMPLETE', payload: name})
        });
    }
};

export default fetch = (state = initialState, action = { type: 'NOOP' }) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, currentlyFetching: [...state.currentlyFetching, action.payload] };
        case 'FETCH_COMPLETE':
            return { ...state, currentlyFetching: [...state.currentlyFetching.filter(item => item !== action.payload)] };
        default:
            return state;
    }
};
