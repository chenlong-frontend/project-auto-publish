var zip = require('./zip')
var ssh = require('./ssh-connect')

function UploadDistPlugin(options) {
  const {zip, ssh} = options
  this.zip = zip
  this.ssh = ssh
}

UploadDistPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', () => {
    zip(this.zip, () => {
      ssh(this.ssh, this.zip)
    })
  });
};

module.exports = UploadDistPlugin;