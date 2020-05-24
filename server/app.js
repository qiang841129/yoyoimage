const path = require('path');
const os = require('os');
const express = require('express');
const filehandler = require('./filehandler');

const app = express();

// 设置允许跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS');
    if (req.method.toLowerCase() == 'options') {
        res.send(200);
    } else {
        next();
    }
})


app.get('/', (req, res) => {
    res.send('Hello express');
})

app.get('/api/img/list/', (req, res) => {

    let imgs = filehandler.listImages(path.join(os.homedir(), 'Documents/work/familycenter/data/img'));

    res.json({
        status: 0,
        imgs: [imgs]
    });
})

app.listen(3000);
