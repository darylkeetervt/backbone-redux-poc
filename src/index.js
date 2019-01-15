import Backbone from 'backbone';
import jQuery from 'jquery';
import _underscore from 'underscore';

require('purecss');

Backbone.$ = jQuery;
export const app = app || {};
app.views = app.views || {};
app.models = app.models || {};
app.collections = app.collections || {};

// Load component files
const requireAll = (r) => { r.keys().forEach(r); };
requireAll(require.context('./components/', true, /\.view\.js$/));
requireAll(require.context('./components/', true, /\.model\.js$/));
requireAll(require.context('./components/', true, /\.collection\.js$/));

// Override template delimiters to avoid server interpolation conflicts
_underscore.templateSettings = {
    escape: /\<\@-(.+?)\@\>/g,
    interpolate: /\<\@=(.+?)\@\>/g,
    evaluate: /\<\@(.+?)\@\>/g,
};

// Export underscore with template override. Import from this file!
export const _ = { ..._underscore };

/**
 * @author Salvatore Randazzo
 */

// Resetting $ to jquery, if we decide to remove jquery dependency w can do it from here
(($, APP) => {
    'use strict';

    /**
     * Loader
     * @returns {{init: Function}}
     * @constructor
     */

    const Loader = () => {
        let components = null;
        let view = '';
        let model = '';
        let collection = '';
        const viewsInstances = [];

        /**
         * Initializer
         */
        const init = () => {
            Backbone.$ = $;
            components = $('[data-view]').toArray();

            components.forEach(component => {

                view =  $(component).attr('data-view');
                model = $(component).attr('data-model');
                collection = $(component).attr('data-collection');

                if (app.views[view] !== undefined) {

                    if (collection === undefined) {
                        viewsInstances.push(new app.views[view]({
                            el: $(component),
                            model: app.models[model] !== undefined ? new app.models[model]() : null
                        }));
                    } else {
                        viewsInstances.push(new app.views[view]({
                            el: $(component),
                            collection: app.collections[collection] !== undefined ? new app.collections[collection]() : null
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

})(jQuery, app);
