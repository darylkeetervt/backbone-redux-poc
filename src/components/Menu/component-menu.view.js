import { View }  from '../../globals/Component';
import {app} from '../../index';

require('./component-menu.scss');

class Menu extends View {


    constructor(options) {
        super({
            ...options,
            events: {
                'click .post': 'click',
            }
        });
    }

    render() {

    }
}

app.views.Menu = Menu;
