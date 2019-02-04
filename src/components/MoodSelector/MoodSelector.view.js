import { ComponentView } from '../../globals/Component';
import { _, app } from '../../index';
import { fetchCollection } from '../../reducers/fetch';

require('./MoodSelector.scss');

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

            this.render();
        }
    }

    /**
     * Renders the title.
     * @return {*[]} element array
     */
    renderTitle () {
        return [this.renderAppView('Title', { props: { title: 'Radiohead' } })];
    }

    /**
     * Renders the collection of SongCards.
     * @return {any[]}
     */
    renderSongCardsPreview () {
        return this.collection.models.map(model => {
                return this.renderAppView('SongCardPreview', { model })
        });
    }

    render() {
        const html = [...this.renderTitle(), ...this.renderSongCardsPreview()];

        this.$('.selector-outer').html(html);
    }


}

app.views.MoodSelector = MoodSelector;
