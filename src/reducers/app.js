const initialState = {
    loaded: false,
    alertedListeners: [],
    dataListeners: []
};

/**
 * Handles app level actions such as whether the application has fully loaded and
 * notifying views that their collection data has changed.
 * @param {object} state
 * @param {object} action
 * @returns {*} new state object
 */
export default function setLoaded(state = initialState, action = { type: 'NOOP' }) {
    switch (action.type) {
        case 'APP_LOADED':
            return { ...state, loaded: true };
        case 'REGISTER_DATA_LISTENERS':
            return { ...state, dataListeners: [...state.dataListeners, ...action.payload] };
        case 'NOTIFY_VIEW':
            return { ...state, alertedListeners: [...new Set([...state.alertedListeners, action.payload])] };
        case 'VIEW_ACKNOWLEDGED':
            return { ...state, alertedListeners: [...new Set([...state.alertedListeners])].filter(item => item !== action.payload) };
        default:
            return state;
    }
}
