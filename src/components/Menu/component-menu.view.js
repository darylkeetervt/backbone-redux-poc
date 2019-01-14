import { View }  from '../../globals/Component';
import {daddario} from '../../index';

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

daddario.views.Menu = Menu;
