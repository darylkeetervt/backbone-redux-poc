const initialState = {
    currentFilter: ''
};

export default function filter(state = initialState, action = { type: 'NOOP' }) {
    switch (action.type) {
        case 'FILTER':
            console.log('updating filter');
            return { ...state, currentFilter: action.entry };
        default:
            return state;
    }
}
