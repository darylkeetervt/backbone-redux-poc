const initialState = {
    loaded: false,
    alertedListeners: [],
    dataListeners: []
};

export default function setLoaded(state = initialState, action = { type: 'NOOP' }) {
    switch (action.type) {
        case 'APP_LOADED':
            return { ...state, loaded: true };
        case 'REGISTER_DATA_LISTENERS':
            return { ...state, dataListeners: [...new Set([...state.dataListeners, ...action.payload.map(item => item.toUpperCase())])] };
        case 'LOG_ACTION':
            return { ...state, alertedListeners: [...new Set([...state.alertedListeners, action.payload])] };
        case 'ACK_ACTION':
            return { ...state, alertedListeners: [...new Set([...state.alertedListeners])].filter(item => item !== action.payload) };
        default:
            return state;
    }
}
