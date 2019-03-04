import { ComponentView }  from '../../globals/Component';
import { app } from '../../index';

require('./component-menu.scss');

class Menu extends ComponentView {


    constructor(options) {
        super({
            ...options,
            events: {

            }
        });

    }

    render() {

    }
}

app.views.Menu = Menu;
