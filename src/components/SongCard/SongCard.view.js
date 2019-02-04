import { ComponentView } from '../../globals/Component';
import { _, app } from '../../index';

require('./SongCard.scss');

class SongCard extends ComponentView {

    constructor(options) {
        super({
            ...options,
            events: {
                'click .play' : 'play',
                'click .pause' : 'pause',
                'mouseleave .pause' : 'toggleControls',
                'mouseenter .pause' : 'toggleControls'
            }
        });
    }

    toggleControls(event) {
        const $pauseButton = this.$('.pause');

        switch(event.type) {
            case 'mouseenter':
                $pauseButton.removeClass('hide');
                break;
            case 'mouseleave':
                $pauseButton.addClass('hide');
                break;
            default:
                break;
        }
    }

    onAppReady() {
        this.setTemplate('component-song-card');
        this.render();

        this.$video = this.$('video');
        this.$video[0].ontimeupdate = this.updateTrackInfo.bind(this);
        this.$video[0].onended = this.songOver.bind(this);
    }

    formatTrackTime(time) {
        const date = new Date(null);
        date.setSeconds(parseInt(time.toFixed(0)));

        return date.toISOString().substr(11, 8);
    }

    updateTrackInfo() {
        const video = this.$video[0];
        this.$('.track-time').html(this.formatTrackTime(video.currentTime));
        this.$('.time-left').html(`-${this.formatTrackTime(video.duration - video.currentTime)}`);
    }

    play() {
        this.trigger('play', this.model.attributes.trackId);
    }

    pause() {
        this.trigger('pause', this.model.attributes.trackId);
    }

    songOver() {
        this.trigger('over', this.model.attributes.trackId)
    }

    render() {
        this.$el.html(this.template({ element: this.model.attributes }));
    }
}

app.views.SongCard = SongCard;
