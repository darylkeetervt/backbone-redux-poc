import { ComponentView }  from '../../globals/Component';
import { app } from '../../index';
import { applyFilter } from '../../reducers/filter';

require('./Filter.scss');

class Filter extends ComponentView {

    constructor(options) {
        super({
            ...options,
            events: {
                'keyup input[name="entry"]': 'filter'
            }
        });

    }

    filter (e) {
        this.props.applyFilter(e.target.value);
    }

    mapDispatchToProps = {
        applyFilter
    };
}

app.views.Filter = Filter;

