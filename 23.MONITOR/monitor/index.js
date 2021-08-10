
import perF from './performance.js';
// 监控页面的性能
// 监控页面的性能是什么？- 就是算时间差，算一下dns解析用了多久，算一下dom加载用了多久，
// 算一下整个页面加载完成用了多久。不用自己算，浏览器给了个api，Performance api，

let img;
let formatterObj = (data) => {
    let arr = [];
    for (let key in data) {
        arr.push(`${key}=${data[key]}`);
    };
    return arr.join('&');
}
perF.init((data) => {
    console.log(data);
    console.log(formatterObj(data));
    // 得到数据之后传给后台，一般两种情况：
    // 1、ajax，有感传输，有跨域问题 2、无感传输，image标签,优点：image没有跨域问题，可以发到任何地方
    img = new Image();
    img.src = 'reportData?' + formatterObj(data);
});
// 监控页面静态资源的加载情况

// 监控ajax

// 页面的异常捕获（报错）

// 监控用户的行为