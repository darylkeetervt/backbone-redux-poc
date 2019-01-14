import {View} from 'backbone';
import {daddario} from '../../index';
import _ from 'underscore';
import $ from 'jquery';

require('./Filter.scss');

class Filter extends View {

    constructor(options) {
        super({
            ...options,
            events: {
                'keyup input[name="entry"]': 'filter'
            }
        });
        console.log('Filter Loaded');
    }

    filter () {
        const entry = this.$('input[name="entry"]').val();
    }
}

daddario.views.Filter = Filter;

