const path = require('path');
const os = require('os');
const fs = require('fs');
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

app.get('/img/', (req, res) => {
    let file = req.query.path;
    let ext = path.extname(file);
    if (ext != '') {
        ext = ext.substr(1);
    }
    fs.readFile(file, (err, data) => {
        res.writeHead(200, {'Content-Type': 'image/' + ext});
        let stream = fs.createReadStream(file);
        if (stream) {
            var resData = [];
            stream.on('data', (chunk) => {
                resData.push(chunk);
            })
            stream.on('end', () => {
                let data = Buffer.concat(resData);
                res.write(data);
                res.end();
            })
        }
    });
})

app.get('/api/img/list/', (req, res) => {
    let imgs = filehandler.listImages(path.join(os.homedir(), 'Documents/work/familycenter/data/img'));
    res.json({
        status: 0,
        imgs: [imgs]
    });
})

app.listen(3000);
