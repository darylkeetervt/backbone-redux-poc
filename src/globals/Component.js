import { View } from 'backbone';
import { _, uuid } from '../index';
import $ from 'jquery';
import { store } from '../store/AppStore';

export class ComponentView extends View {

    constructor (options) {
        super(options);

        // Assign each view a unique ID to coordinate reactive view rendering based on the redux state.
        this.uuid = uuid();

        // Subscribe to ALL store update events. For now, the views will handle filtering the actions to decide
        // if they want to render or not based on what actions have been dispatched.
        store.subscribe(this.handleStoreUpdate.bind(this));

        // If the view is instantiated sometime after the app has loaded then the state changes may be finished
        // so check if we need to go ahead with the runOnce.
        this.appLoaded();
    }

    /**
     * Returns an instance of the store.
     * @returns {object} store
     */
    getStore() {
        return store;
    }

    /**
     * Run onAppReady once if defined on the subclass.
     * This ensures that all collections and views have been loaded
     * and all reducers have set their initial states in the store.
     */
    appLoaded() {
        const state = store.getState();
        if (!this.loaded && state.app && state.app.loaded) {
            if (typeof this.onAppReady === 'function') {
                this.onAppReady(store);
            }
            this.loaded = true;
        }
    }

    /**
     * Will execute each time the state is updated in the store.
     */
    handleStoreUpdate = () => {
        this.appLoaded();

        if (typeof this.onStoreUpdated === 'function') {
            this.onStoreUpdated(store);
        }
    };

    /**
     * Sets which element in the DOM to be used as the Underscore template.
     * @param {string} templateId
     */
    setTemplate = (templateId) => {
        this.template = _.template($(`#${templateId}`).html());
    };


}