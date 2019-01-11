import Backbone from 'backbone';
import _ from 'underscore';

export class View extends Backbone.View {

    constructor (options, events = {}) {
        _.defaults(options, {
            // These options are assigned to the instance by Backbone
            events: {...events},
        });

        super(options);
    }
}