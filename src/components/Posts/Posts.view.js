import { ComponentView } from '../../globals/Component';
import { app } from '../../index';
import { fetchCollection } from '../../reducers/fetch';

require('./Posts.scss');

class Posts extends ComponentView {

    constructor(options) {
        super({
            ...options,
            events: {
                'click .post-button': 'buttonClicked'
            }
        });
    }

    onAppReady () {
        this.setTemplate('component-post');
        fetchCollection(this.collection);
    }

    onStoreUpdated (store) {
        // Check if POSTS were changed before rendering
        const { app: { alertedListeners } } = store.getState();
        if (alertedListeners.includes(this.uuid)) {
            store.dispatch({ type: 'VIEW_ACKNOWLEDGED', payload: this.uuid });
            this.render();
        }
    }

    buttonClicked (element) {
        const modelId = this.$(element.currentTarget).data('post-id');
        let model = this.collection.get(modelId);
        model.set({ title: 'random'});
    }

    render() {
        const { filter: { currentFilter} } = this.getStore().getState();
        const posts = this.collection.toJSON().filter(post => post.title.indexOf(currentFilter) > -1);
        this.$('.pure-g').html(this.template({ data: posts }));
    }
}

app.views.Posts = Posts;
