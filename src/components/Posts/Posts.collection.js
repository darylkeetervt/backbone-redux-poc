import Backbone from 'backbone';
import {daddario} from '../../index';

daddario.collections.Posts =  Backbone.Collection.extend({
    url: `https://jsonplaceholder.typicode.com/posts`,
    model: daddario.models.Post,
});
