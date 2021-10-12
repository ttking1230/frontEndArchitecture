
const fs = require("fs");
const execa = require("execa"); //开启子进程进行打包

const target = "reactivity";
// 开发环境打包指定模块即可
build(target);
async function build(target) {
    console.log(target);
    // execa 第一个参数是执行的命令，表示采用rollup打包，第二个参数是给执行的命令传的参数
    // 第三个参数：子进程的输出共享到父进程里面
    await execa("rollup", ["-cw", '--environment', `TARGET:${target}`],
        {
            stdio: 'inherit'
        });
}
