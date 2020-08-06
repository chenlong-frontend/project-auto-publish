var Client = require('ssh2').Client;

var upload = function ({upload,serve},{name, path}) {
  var conn = new Client();
  conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
      if (err) throw err;
      sftp.fastPut(path + name, upload.remote + name, {},function(err) {
        if (err) throw err
        conn.exec('cd ' + upload.remote + ' && unzip -o ' + name,function(err, stream){
          if (err) throw err;
          stream.on('close', function(code, signal) {
              console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
              conn.end();
          }).on('data', function(data) {
              console.log('STDOUTDA: ' + data);
          }).stderr.on('data', function(data) {
              console.log('STDERR: ' + data);
          });
        })
      })

    })
  }).connect(serve);
}



module.exports = upload