import { View }  from '../globals/Component';
import {daddario} from '../index';

class Menu extends View {

    constructor (options) {
        super({
            ...options,
            events: {
                'click .test': 'click',
            }
        });

        console.log(options);

        this.model.on('change', this.render.bind(this));

        this.model.set({name: 'Salvatore'});
    }

    click () {
        console.log(this);
        this.model.set({name: 'Daryl'});
    };

    render () {
        console.log(`<h1 class="test">${this.model.get('name')}</h1>`);
        this.$el.html(`<h1 class="test">${this.model.get('name')}</h1>`);
    }
}

daddario.views.Menu = Menu;
