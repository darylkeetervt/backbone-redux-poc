import { ComponentView }  from '../../globals/Component';
import { app, uuid } from '../../index';
import { store } from '../../store/AppStore';

require('./component-menu.scss');

class Menu extends ComponentView {


    constructor(options) {
        super({
            ...options,
            events: {
                'click .post': 'click',
            }
        });

        this.uuid = uuid();

        store.subscribe(this.handleChange.bind(this));
    }

    handleChange () {
        const { app: { alertedListeners } } = store.getState();
        if (alertedListeners.includes(this.uuid)) {
            store.dispatch({ type: 'VIEW_ACKNOWLEDGED', payload: this.uuid });
            this.render();
        }
    }

    render() {

    }
}

app.views.Menu = Menu;
