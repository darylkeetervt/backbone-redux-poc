const initialState = {
    currentFilter: ''
};

export const applyFilter = (filter) => {
    return (dispatch) => {
        dispatch({ entry: filter, type: 'FILTER_POSTS' });
    };
};

export default function filter(state = initialState, action = { type: 'NOOP' }) {
    switch (action.type) {
        case 'FILTER_POSTS':
            return { ...state, currentFilter: action.entry };
        default:
            return state;
    }
}
