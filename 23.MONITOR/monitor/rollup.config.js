
import babel from "rollup-plugin-babel";
export default {
    input :'./index.js',
    output: {
        file: '../website/client/monitor.js',
        // es6语法的模块化在浏览器不认，说一下模块化用umd，统一模块化
        format: 'umd'
    },
    watch: {
        exclude: "node_modules/**"
    },
    plugin:[
        babel({
            babelrc: false,
            prerets:[
                "@babel/preset-env"
            ]
        })
    ]
}