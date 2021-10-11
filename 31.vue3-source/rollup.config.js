
// console.log(process.env.TARGET);
// 根据环境变量中的target属性，获取对应模块中的package.json

import path from "path";

const packagesDir = path.resolve(__dirname, "packages");
console.log("packagesDir", packagesDir);

const packageDir = path.resolve(packagesDir, process.env.TARGET);
console.log("packageDir", packageDir);