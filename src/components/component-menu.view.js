import { View }  from '../globals/Component';
import {daddario} from '../index';
import _ from 'underscore';
import $  from 'jquery';

require('./component-menu.scss');

class Menu extends View {

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

daddario.views.Menu = Menu;
