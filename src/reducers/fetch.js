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
    return (dispatch, getState) => {

        const name = collection.collectionName.toUpperCase();
        if (!getState().fetch.currentlyFetching.includes(name)){
            dispatch({ type: 'FETCH_COLLECTION_START', payload: name });
            collection.fetch().then(() => dispatch({ type: 'FETCH_COLLECTION_COMPLETE', payload: name }))
        }

    };
};

export default fetch = (state = initialState, action = { type: 'NOOP' }) => {
    switch (action.type) {
        case 'FETCH_COLLECTION_START':
            return { ...state, currentlyFetching: [...state.currentlyFetching, action.payload] };
        case 'FETCH_COLLECTION_COMPLETE':
            return { ...state, currentlyFetching: [...state.currentlyFetching.filter(item => item !== action.payload)] };
        default:
            return state;
    }
};
