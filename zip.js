let fs = require("fs");
let path = require("path");
let JSZIP = require("jszip");
let zip = new JSZIP();

//读取目录及文件
function readDir(obj, nowPath) {
    let files = fs.readdirSync(nowPath);
    files.forEach(function (fileName, index) {
        let fillPath = nowPath + "/" + fileName;
        let file = fs.statSync(fillPath);
        if (file.isDirectory()) {
            let dirlist = zip.folder(fileName);
            readDir(dirlist, fillPath);
        } else {
            obj.file(fileName, fs.readFileSync(fillPath));
        }
    });
}

//开始压缩文件
function zip() {
    var currPath = __dirname;
    var targetDir = path.join(currPath, "test");
    readDir(zip, targetDir);
    zip.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    }).then(function (content) {
        fs.writeFileSync(currPath + "/result.zip", content, "utf-8");
    });
}

module.exports = zip