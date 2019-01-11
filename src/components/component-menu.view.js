import {daddario} from '../index';
import $ from 'jquery';

class Menu extends Backbone.View {
    $el = $('[data-view="component-menu"]');

    constructor () {
        super();
    }

    initialize () {
        console.log('component: Menu Loaded', this.$el, this.el);
        this.render();
    }

    render () {
        console.log(this.$el);
        this.$el.append('<h1>Hello World</h1>');
    }
}

daddario.views.Menu = Menu;
