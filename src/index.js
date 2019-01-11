import Backbone from 'backbone';
import jQuery from 'jquery';
import _ from 'underscore';

Backbone.$ = jQuery;
export let daddario = daddario || {};
daddario.views = daddario.views || {};
daddario.models = daddario.models || {};
daddario.collections = daddario.collections || {};

function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('./components/', true, /\.view\.js$/));

/**
 * @author Salvatore Randazzo
 */

// Resetting $ to jquery, if we decide to remove jquery dependency w can do it from her

(function ($, DD) {
    'use strict';

    /**
     * Loader
     * @returns {{init: Function}}
     * @constructor
     */

    var Loader = function () {
        var components = null;
        var view = '';
        var model = '';
        var collection = '';
        var viewsInstances = [];
        var tempCollection = null;

        /**
         * Initializer
         */
        var init = function () {

            Backbone.$ = $;

            components = $('[data-view]');

            console.log(components);

            _.each(components, function (component) {
                view =  $(component).attr('data-view');
                model = $(component).attr('data-model');
                collection = $(component).attr('data-collection');

                if (daddario.views[view] !== undefined) {

                    if (collection === undefined) {
                        console.log($(component));
                        viewsInstances.push(new daddario.views[view]({
                            el: $(component),
                            model: daddario.models[model] !== undefined ? new daddario.models[model]() : null
                        }));
                    } else {
                        tempCollection = _.find(daddario.dataLoader.collections, (dataLoaderCollection) => {
                            return dataLoaderCollection.name === collection;
                    });

                        if(!tempCollection) {
                            console.error('Probably caused by not found collection with name ' + collection +
                                ' please check that the name matches an actual package. Available packages:', daddario.dataLoader.collections);
                        }

                        viewsInstances.push(new daddario.views[view]({
                            el: $(component),
                            collection: tempCollection.object
                        }));
                    }

                } else {
                    throw new Error ('No view found for ' + view );
                }

            });


        };

        // Public
        return {
            init: init,
            viewInstances: viewsInstances
        };
    };

    // Starting the application
    window.loader = new Loader();
    window.loader.init();

})(jQuery, daddario);
