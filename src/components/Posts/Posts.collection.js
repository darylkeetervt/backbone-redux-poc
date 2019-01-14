import Backbone from 'backbone';
import {app} from '../../index';

app.collections.Posts =  Backbone.Collection.extend({
    url: `https://jsonplaceholder.typicode.com/posts`,
    model: app.models.Post,
});
