import { ComponentView } from '../../globals/Component';
import { _, app } from '../../index';
import { fetchCollection } from '../../reducers/fetch';

class MoodSelector extends ComponentView {

    constructor(options) {
        super({
            ...options,
            events: {

            }
        });
    }

    onAppReady() {
        this.setTemplate('component-mood-selector');
        fetchCollection(this.collection);
    }

    onStoreUpdated(store) {
        const state = store.getState();

        // Check if data we are listening to in the store was changed before rendering
        const { app: { alertedListeners } } = state;
        const matchedListeners = alertedListeners.filter(viewId => viewId === this.uuid);

        if (matchedListeners.length) {
            matchedListeners.forEach(() => store.dispatch({type: 'VIEW_ACKNOWLEDGED', payload: this.uuid}));

            this.elements = _.pluck(
                this.collection.models.map(model => {
                    return new app.views.SongCardPreview({ model: model });
                })
                , '$el'
            );

            this.render();
        }
    }

    render() {
        this.$('.selector-outer').html(this.elements);
    }


}

app.views.MoodSelector = MoodSelector;
