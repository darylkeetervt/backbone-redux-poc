import {View} from 'backbone';
import {daddario} from '../../index';
import _ from 'underscore';
import $ from 'jquery';

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
        this.$('.pure-g').html(this.template({ data: this.collection.toJSON() }));
    }
}

daddario.views.Posts = Posts;

