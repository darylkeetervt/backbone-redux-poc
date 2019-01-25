import {View} from 'backbone';
import { app, uuid} from '../../index';
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

        this.uuid = uuid();
    }

    filter () {
        const entry = this.$('input[name="entry"]').val();
        store.dispatch({ entry, type: 'FILTER_POSTS' });
    }
}

app.views.Filter = Filter;

