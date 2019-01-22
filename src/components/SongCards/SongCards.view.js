import { View } from 'backbone';
import { app, _ } from '../../index';
import $ from 'jquery';
import { store } from '../../store/AppStore';
import 'slick-carousel';

require('./SongCards.scss');
require('../../globals/slick-carousel.scss');

class SongCards extends View {

    /**
     * Underscore template declaration
     */
    template = _.template($('#component-song-cards').html());

    constructor(options) {
        super({
            ...options,
            events: {

            }
        });

        store.subscribe(this.handleChange.bind(this));

        this.collection.fetch({
            success: (data) => {
                this.elements = _.pluck(
                    this.collection.models.map(model => {
                        const view = new app.views.SongCard({ model: model });
                        this.listenTo(view, 'play', this.play);
                        this.listenTo(view, 'pause', this.pause);
                        this.listenTo(view, 'over', this.songOver);

                        return view;
                    })
                    , '$el'
                );
                this.render();
            }
        });

        this.$carousel = this.$('.pure-g');
        this.setCarouselConfig();
    }

    setCarouselConfig() {
        this.$carousel.on('afterChange', this.onTrackChanged.bind(this));

        this.carouselSettings = {
            draggable: true,
            arrows: false,
            centerMode: true,
            centerPadding: '10%',
            infinite: false,
            focusOnSelect: true
        };
    }

    play(videoId) {
        const $video = this.$(`#video-${videoId}`);

        this.stopAllPlaybackExceptCurrent(videoId);
        $(`button[data-video-id="${videoId}"]`).addClass('pause hide').removeClass('play');
        $video[0].play();
    }

    pause(videoId) {
        const $video = this.$(`#video-${videoId}`);

        $(`button[data-video-id="${videoId}"]`).addClass('play').removeClass('pause');
        $video[0].pause();
    }

    songOver(videoId) {
        this.pause(videoId);
        this.nextSong();
    }

    nextSong() {
        this.$carousel.slick('slickNext');
    }

    onTrackChanged(event, slick, slideNumber) {

        if (slideNumber !== this.currentSlideIndex) {
            const $songCard = this.$(`[data-slick-index="${slideNumber}"]`);
            const $currentVideo = $songCard.find('video');

            this.stopAllPlaybackExceptCurrent();
            this.play($currentVideo.data('video-id'));
            this.currentSlideIndex = this.$carousel.slick('slickCurrentSlide')
        }

    }

    stopAllPlaybackExceptCurrent(currentVideoId) {
        this.$('video').each((index, video) => {
            const $video = $(video);

            if ($video.data('video-id') !== `${currentVideoId}` && !$video.hasClass('pause')) {
                this.pause($video.data('video-id'));
                $video.currentTime = 0;
            }
        });
    }

    handleChange () {
        // Check if POSTS were changed before rendering
        const { app: { alertedListeners } } = store.getState();
        if (alertedListeners.includes('SONG_CARDS')) {
            store.dispatch({ type: 'ACK_ACTION', payload: 'SONG_CARDS' });
            this.render();
        }
    }

    render() {
        this.$carousel.html(this.elements).slick(this.carouselSettings);
    }


}

app.views.SongCards = SongCards;
