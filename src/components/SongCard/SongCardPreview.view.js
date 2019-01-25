import { ComponentView } from '../../globals/Component';
import { app, _ } from '../../index';

require('./SongCardPreview.scss');

class SongCardPreview extends ComponentView {

    constructor(options) {
        super({
            ...options,
            events: {

            }
        });
    }

    onAppReady() {
        this.setTemplate('component-song-card-preview');
        this.render();
    }

    render() {
        this.$el.html(this.template({ element: this.model.attributes }));

        return this;
    }
}

app.views.SongCardPreview = SongCardPreview;
