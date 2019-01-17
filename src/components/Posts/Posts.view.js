import { View } from 'backbone';
import { app, _ } from '../../index';
import $ from 'jquery';
import { store } from '../../store/AppStore';

require('./Posts.scss');

class Posts extends View {

    /**
     * Underscore template declaration
     */
    template = _.template($('#component-post').html());

    constructor(options) {
        super({
            ...options,
            events: {
                'click .post': 'click',
                'click .post-button': 'buttonClicked'
            }
        });

        store.subscribe(this.handleChange.bind(this));

        this.collection.fetch({
            success: (data) => {
                this.render();
            }
        });
    }

    handleChange () {
        // Check if POSTS were changed before rendering
        const { app: { alertedListeners } } = store.getState();
        if (alertedListeners.includes('POSTS')) {
            store.dispatch({ type: 'ACK_ACTION', payload: 'POSTS' });
            this.render();
        }
    }

    click () {

    }

    buttonClicked (element) {
        const modelId = $(element.currentTarget).data('post-id');
        let model = this.collection.get(modelId);
        model.set({ title: 'random'});
    }

    render() {
        const { filter: { currentFilter} } = store.getState();
        const posts = this.collection.toJSON().filter(post => post.title.indexOf(currentFilter) > -1);
        this.$('.pure-g').html(this.template({ data: posts }));
    }
}

app.views.Posts = Posts;
