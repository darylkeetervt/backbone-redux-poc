import {View} from 'backbone';
import {daddario} from '../../index';
import { store } from '../../store/AppStore';

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
        store.dispatch({ entry, type: 'FILTER' });
    }
}

daddario.views.Filter = Filter;

