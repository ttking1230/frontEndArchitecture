### rm -rf node_modules  
cmd命令，删除当前项目的node_modules文件

### yarn install 的时候，packages下面所有包的node_modules都会被下载到根目录的node_moduels里面
并且会产生软链接，软链接地址指向要看根目录package.json的workspaces配置,并且需要在tsconfig.json里面
配置"moduleResolution": "node","paths": {
      "@vue/*": [
        "packages/*/src"
      ]
    }
workspaces：告诉我当前项目下管理了哪些其他的包

### 后续Object上面的方法会迁移到Reflect上面
以前target[key] = value 这种方式设置值可能会失败，并不会报异常，也没有返回值标识，
Reflect方法具备返回值