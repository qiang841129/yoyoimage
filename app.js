const path = require('path');
const os = require('os');
const express = require('express');
const filehandler = require('./server/filehandler');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello express');
})

app.get('/api/img/list/', (req, res) => {

    let imgs = filehandler.listImages(path.join(os.homedir(), 'Documents/work/familycenter/data/img'));

    res.json({
        status: 0,
        imgs: imgs
    });
})

app.listen(3000);
