# project-auto-publish

平时自己写的一些小页面，部署的时候需要手动传到服务上，

通过这个 `webpack` 小插件，可以将项目打包直接推送到服务端。

此插件依赖 `jszip`, `ssh2`

使用方法

ssh连接可以使用key，具体可见ssh2 [文档](https://github.com/mscdex/ssh2)

```js
plugins: [
  new uploadDistPlugin(
    {
      zip: {
        // 压缩包名称
          name: 'dist.zip',
          // 需要压缩的文件目录，并在当前目录下生成指定压缩包名的zip文件
          path: path.join(__dirname, "../dist/")
        },
        ssh: {
          serve: {
          	host: 'xx.xx.x.xxx', // 远程服务地址
          	port: 22, // 端口号
          	username: 'root', // 用户名
          	password: 'xxxxx' // 密码
          },
          upload: {
            // 需要上传的远程服务地址
            remote: '/usr/local/nginx/html/xxx' 
          },
        }
      })
]
```

