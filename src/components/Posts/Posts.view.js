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
        this.props.fetchCollection(this.collection);
    }

    buttonClicked (element) {
        const modelId = this.$(element.currentTarget).data('post-id');
        let model = this.collection.get(modelId);
        model.set({ title: 'random'});
    }

    render() {
        const { filter: { currentFilter} } = this.store.getState();
        const posts = this.collection.toJSON().filter(post => post.title.indexOf(currentFilter) > -1);
        this.$('.pure-g').html(this.template({ data: posts }));
    }

    /**
     * Define functions which need to be wrapped with dispatch.
     * @type {object}
     */
    mapDispatchToProps = {
        fetchCollection
    };
}

app.views.Posts = Posts;
