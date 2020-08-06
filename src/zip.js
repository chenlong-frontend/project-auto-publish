let fs = require("fs");
let JSZIP = require("jszip");
let zip = new JSZIP();

//读取目录及文件
function readDir(obj, nowPath, dir) {
    let files = fs.readdirSync(nowPath);
    files.forEach(function (fileName, index) {
        let fillPath = nowPath + "/" + fileName;
        let file = fs.statSync(fillPath);
        if (file.isDirectory()) {
            let curdir = !dir ? fileName : dir + '/' + fileName
            let dirlist = zip.folder(curdir);
            readDir(dirlist, fillPath, curdir);
        } else {
            obj.file(fileName, fs.readFileSync(fillPath));
        }
    });
}

//开始压缩文件
function zipFile(options, callback) {
    const {name, path} = options
    let output = path + name
    if (fs.existsSync(output)) {
        fs.unlinkSync(output)
    }
    readDir(zip, path, '');
    zip.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    }).then(function (content) {
        fs.writeFileSync(output, content, "utf-8");
        callback()
    });
}

module.exports = zipFile
