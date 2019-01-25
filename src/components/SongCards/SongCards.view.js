import { ComponentView } from '../../globals/Component';
import { app, _ } from '../../index';
import $ from 'jquery';
import 'slick-carousel';
import { fetchCollection } from '../../reducers/fetch';

require('./SongCards.scss');
require('../../globals/slick-carousel.scss');

class SongCards extends ComponentView {

    constructor(options) {
        super({
            ...options,
            events: {

            }
        });
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

    onAppReady () {
        this.setTemplate('component-song-cards');
        this.elements = [];
        this.$carousel = this.$('.pure-g');
        this.setCarouselConfig();
        fetchCollection(this.collection);
    }

    onStoreUpdated (store) {
        const state = store.getState();

        // Check if data we are listening to in the store was changed before rendering
        const { app: { alertedListeners } } = state;
        const matchedListeners = alertedListeners.filter(viewId => viewId === this.uuid);


        if (matchedListeners.length) {
            matchedListeners.forEach(() => store.dispatch({type: 'VIEW_ACKNOWLEDGED', payload: this.uuid}));

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
    }

    render() {
        this.$carousel.html(this.elements).slick(this.carouselSettings);
    }


}

app.views.SongCards = SongCards;
