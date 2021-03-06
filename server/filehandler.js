const fs = require('fs');
const path = require('path');


let isImage = (file) => {
    let extname = path.extname(file);
    return ['.jpg', '.jpeg', '.png', '.gif'].indexOf(extname.toLowerCase()) > -1;
}


let dirName = (dir) => {
    let split = dir.lastIndexOf('/');
    return split > -1 ? dir.substr(split + 1) : dir;
}


let listImages = (dir) => {
    var res = {
        'path': dir,
        'name': dirName(dir),
        'imgs': [],
        'total': 0,
        'child': [],
    };

    fs.readdirSync(dir).forEach((item, index) => {
        if (item[0] == '.') {
            return;
        }

        let file = path.join(dir, item);
        let stat = fs.lstatSync(file);
        if (stat.isDirectory()) {
            res['child'].push(listImages(file));
        } else {
            if (isImage(file)) {
                res['imgs'].push({
                    'name': item,
                    'mtime': stat.mtimeMs,
                });
            }
        }
    });
    res['total'] = res['imgs'].length;
    return res;
}

exports.listImages = listImages;
