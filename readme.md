## Installation and execution

> This documentation is WIP

```shell
# Install all the packages
npm i

# Start the environment
npm start

# Start the server
node server.js
```

# Creating a template
The system is using mustache as a templating engine, for more information please have a look at https://mustache.github.io/

```html
<div class="component-posts" data-view="Posts" data-collection="Posts">
   
</div>
``` 
> Note on `data-view='Posts'` and `data-collection='Posts'`

```javascript
import {View} from 'backbone';
import {clientName} from '../../index';
import _ from 'underscore';
import $ from 'jquery';
import {store} from '../../store/AppStore';

require('./Posts.scss'); // Styling import

class Posts extends View {
    /**
     * Underscore template declaration
     */
    template = _.template($('#component-post').html());
    
    /**
    * No Need to use initialize anymore :)
    */
    constructor(options) {
        super({
            ...options,
            events: {
                'click .post': 'click',
            }
        });
        
        // TODO: move collection to store
        store.subscribe(this.render.bind(this));

        this.collection.fetch({
            success: (data) => {
                this.render();
            }
        })
    }
    
    click () {
          alert('clickced');
    }

    render() {
        const {currentFilter} = store.getState();
        const posts = this.collection.toJSON().filter(post => post.title.indexOf(currentFilter) > -1);
        this.$('.pure-g').html(this.template({ data: posts }));
    }
}

clientName.views.Posts = Posts;
```
