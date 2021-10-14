
// console.log(process.env.TARGET);
// 根据环境变量中的target属性，获取对应模块中的package.json

import path from "path";
import json from "@rollup/plugin-json";
import resolvePlugin from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";

// 找到打包的packages目录
const packagesDir = path.resolve(__dirname, "packages");
console.log("packagesDir", packagesDir);

// 打包的基准目录，，找到要打包的某个包
const packageDir = path.resolve(packagesDir, process.env.TARGET);
console.log("packageDir", packageDir);

// 永远针对的是某个模块packageDir
const resolve = (p) => path.resolve(packageDir, p);
// 拿到每个模块下面的package.json文件
const pkg = require(resolve("package.json"));
console.log("pkg", pkg);

// 取文件名
const name = path.basename(packageDir);
// 对于打包类型，需要做一个映射表，根据你提供的formats来格式化需要打包的内容
// 打包出三种类型：（区别详见打包出的文件）
// esm-bundler：es6，es6规范 import export
// cjs: 是给node去用的，commonjs规范 require exports
// global：全局的，供script标签引用
const outputConfig = {
    "esm-bundler": {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    },
    "cjs": {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    },
    "global": {
        file: resolve(`dist/${name}.global.js`),
        format: 'iife'
    }
}

// 每个模块的package.json中的自定义选项
const options = pkg.buildOptions;
function creatConfig(format, output) {
    output.name = options.name;
    output.sourcemap = true;
    // ts规范，使用typescript必须配置tsconfig.json
    // 使用ts插件的话，需要配置tsconfig.json配置文件
    // 使用命令npx tsc --init，表示去执行node_modules下.bin下的tsc文件，就会去生成tsconfig.json配置文件
    return {
        input: resolve('src/index.ts'),
        output,
        plugins: [
            json(),
            ts({//ts插件
                tsconfig: path.resolve(__dirname, 'tsconfig.json')//告诉插件用的是哪个配置文件
            }),
            resolvePlugin()//解析第三方模块插件
        ]
    };
}


export default options.formats.map(format => creatConfig(format, outputConfig[format]));