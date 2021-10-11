
const fs = require("fs");
const execa = require("execa"); //开启子进程进行打包

// 过滤掉不是文件夹的文件
const targets = fs.readdirSync("packages").filter(f => fs.statSync(`packages/${f}`).isDirectory());
console.log(targets);
// 目标文件依次打包，并行打包

async function build(target) {
    console.log(target);
    // execa 第一个参数是执行的命令，表示采用rollup打包，第二个参数是给执行的命令传的参数
    // 第三个参数：子进程的输出共享到父进程里面
    await execa("rollup", ["-c", '--environment', `TARGET:${target}`],
        {
            stdio: 'inherit'
        });
}
function runParallel(targets, iteratorFn) {
    let res = [];
    for (const target of targets) {
        let p = iteratorFn(target);
        res.push(p);
    }
    return Promise.all(res);
}
runParallel(targets, build);