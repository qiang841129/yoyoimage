const path = require('path');
const os = require('os');
const fs = require('fs');
const express = require('express');
const {exec} = require('child_process');
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

app.use(express.static(path.resolve(__dirname, '../client/dist/')));

app.get('/', (req, res) => {
    const html = fs.readFileSync(path.resolve(__dirname, '../client/dist/index.html'), 'utf-8');
    res.send(html);
})

app.get('/img/', (req, res) => {
    let file = req.query.path;
    let ext = path.extname(file);
    if (ext != '') {
        ext = ext.substr(1);
    }
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.end();
            return;
        }
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
    let imgs = filehandler.listImages(path.join(os.homedir(), 'Documents/bak/img'));
    res.json({
        status: 0,
        imgs: [imgs]
    });
})

const port = 8060;
app.listen(port, () => {
    switch (process.platform) {
        case 'darwin':
            exec(`open http://localhost:${port}`);
            break;
        case 'win32':
            exec(`start http://localhost:${port}`);
            break;
        default:
            exec(`open http://localhost:${port}`);
            break;
    }
});
