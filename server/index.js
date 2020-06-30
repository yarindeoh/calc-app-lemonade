const express = require('express');
const path = require('path');

const port = 8080;
const app = express();

app.listen(process.env.PORT || port, function() {
    console.log(
        'Express server listening on port %d in %s mode',
        this.address().port,
        app.settings.env
    );
});
// Serve index.html and redirect all requests to / in order to handle routes
app.use('/', express.static('dist'));
// internally by react routers
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
