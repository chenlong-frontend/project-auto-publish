var zip = require('./zip')
var Client = require('ssh2').Client;

zip()

var conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.sftp(function(err, sftp) {
    if (err) throw err;
   sftp.fastPut('result.zip', '/root/test/result.zip', {},function(err, result) {

    conn.exec('cd /root/test/ && unzip -o /root/test/result.zip', {pty: true},function(err, stream){
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

  });
}).connect({
  host: '',
  port: 22,
  username: 'root',
  password: ''
});