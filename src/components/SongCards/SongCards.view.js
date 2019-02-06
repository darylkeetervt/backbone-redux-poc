import { ComponentView } from '../../globals/Component';
import { app, _ } from '../../index';
import $ from 'jquery';
import 'slick-carousel';
import { fetchCollection } from '../../reducers/fetch';
import { viewAcknowledge} from '../../reducers/app';

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
        fetchCollection,
        viewAcknowledge
    };

}

app.views.SongCards = SongCards;
