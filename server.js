const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

app.use(express.static('dist'));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname);

/**
 * Pass the path for your partial directory and
 * the extension of the partials within the mustache-express method
 */
app.engine('mst', mustacheExpress('./src/components', '.mustache'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Listening on 3000');
});
