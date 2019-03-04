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
        this.props.fetchCollection(this.collection);
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

    /**
     * Define functions which need to be wrapped with dispatch.
     * @type {object}
     */
    mapDispatchToProps = {
        fetchCollection
    };


}

app.views.MoodSelector = MoodSelector;
