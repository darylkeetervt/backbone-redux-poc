/**
 * Checks the list of dataListeners and dispatches the LOG_ACTION if
 * the current action type is related to the listener. This allows
 * conditional rendering for views.
 * @param store
 * @returns {function(*): Function}
 */
export const notifyViews = store => next => action => {
    next(action);

    store.getState().app.dataListeners.forEach(item => {
        if (action.type.includes(`_${item}`)) {
            store.dispatch({ type: 'LOG_ACTION', payload: item });
        }
    });
};