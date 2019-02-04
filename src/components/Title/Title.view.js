import { ComponentView } from '../../globals/Component';
import { app, _ } from '../../index';

class Title extends ComponentView {

    constructor(options) {
        super({
            ...options,
            propTypes: {
                title: 'string'
            },
            tagName: 'h1',
            events: {

            }
        });
        this.options = options;
        this.render();
    }

    onAppReady () {
        this.setTemplate('title-component-template');
    }


    render() {
        this.$el.html(this.template({ title: this.options.props.title }));
    }


}

app.views.Title = Title;
