import {View} from 'backbone';
import {daddario} from '../../index';
import _ from 'underscore';
import $ from 'jquery';
import {store} from '../../store/AppStore';

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
            }
        });

        store.subscribe(this.render.bind(this));

        this.collection.fetch({
            success: (data) => {
                this.render();
            }
        })
    }

    click () {
          alert('clickced');
}

    render() {
        const {currentFilter} = store.getState();
        const posts = this.collection.toJSON().filter(post => post.title.indexOf(currentFilter) > -1);
        this.$('.pure-g').html(this.template({ data: posts }));
    }
}

daddario.views.Posts = Posts;
