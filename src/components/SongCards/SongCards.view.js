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

    /**
     * Sets the carousel config object and callbacks.
     */
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

    /**
     * Starts playback of the video with the specified id.
     * @param {string} videoId
     */
    play(videoId) {
        const $video = this.$(`#video-${videoId}`);

        this.stopAllPlaybackExceptCurrent(videoId);
        $(`button[data-video-id="${videoId}"]`).addClass('pause hide').removeClass('play');
        $video[0].play();
    }

    /**
     * Pauses the video with the specified id.
     * @param {string} videoId
     */
    pause(videoId) {
        const $video = this.$(`#video-${videoId}`);

        $(`button[data-video-id="${videoId}"]`).addClass('play').removeClass('pause');
        $video[0].pause();
    }

    /**
     * Called after the current video is over and starts playback of the next video.
     * @param {string} videoId
     */
    songOver(videoId) {
        this.pause(videoId);
        this.nextSong();
    }

    /**
     * Advances the carousel to the next video slide.
     */
    nextSong() {
        this.$carousel.slick('slickNext');
    }

    /**
     * Called when the index of the carousel changes.
     * @param {object} event
     * @param {object} slick
     * @param {number} slideNumber
     */
    onTrackChanged(event, slick, slideNumber) {

        if (slideNumber !== this.currentSlideIndex) {
            const $songCard = this.$(`[data-slick-index="${slideNumber}"]`);
            const $currentVideo = $songCard.find('video');

            this.stopAllPlaybackExceptCurrent();
            this.play($currentVideo.data('video-id'));
            this.currentSlideIndex = this.$carousel.slick('slickCurrentSlide')
        }

    }

    /**
     * Stops playback of all videos except the one with the specified id.
     * @param currentVideoId
     */
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
        this.props.fetchCollection(this.collection);
    }

    onViewNotified() {
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
    }

    render() {
        this.$carousel.html(this.elements).slick(this.carouselSettings);
    }

    /**
     * Define functions which need to be wrapped with dispatch.
     * @type {object}
     */
    mapDispatchToProps = {
        fetchCollection
    };

}

app.views.SongCards = SongCards;
