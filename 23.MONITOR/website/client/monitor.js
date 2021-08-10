(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    // 专门用来写前端页面性能监控的

    let processData = (p) => {
        let data = {
            prevPage: p.fetchStart - p.navigationStart, //上一个页面到当前页面的时长，即卸载的时间
            redirect: p.redirectStart - p.redirectEnd, //上一次页面到当前页面的重定向时间
            dns: p.domainLookupStart - p.domainLookupEnd,    //dns解析的时长
            tcp: p.connectEnd - p.connectStart,    //tcp连接时长

            send: p.responseEnd - p.requestStart,    //从服务器加载页面，从请求到相应的时长
            ttfb: p.responseStart - p.navigationStart,    //首字节接收到的时长
            domReady: p.domInteractive - p.domLoading,  //dom准备的时长
            whiteScreen: p.domLoading - p.navigationStart,  //白屏的时长
            // dom解析的时长包括两种：1、dom元素解析，不包括css，js 2、包括css，js
            // 此处包括
            dom: p.domComplete - p.domLoading,  //dom解析的时长

            onLoad: p.domContentLoadedEventEnd - p.domContentLoadedEventStart,  //onLoad执行的时长
            total: p.loadEventEnd - p.navigationStart,  //总时长，输入网址enter键到页面展示
        };
        return data;
    };

    // 递归检查loadEventEnd时间戳，大于0时说明页面已加载解析完成
    let load = (cb) => {
        let timer;
        let check = () => {
            if (performance.timing.loadEventEnd) {
                clearTimeout(timer);
                timer = null;
                cb();
            } else {
                timer = setTimeout(check, 100);
            }
        };

        window.addEventListener("load", check, false);
    };


    let domReady = (cb) => {
        let timer;
        let check = () => {
            if (performance.timing.domInteractive) {
                clearTimeout(timer);
                timer = null;
                cb();
            } else {
                timer = setTimeout(check, 100);
            }
        };

        window.addEventListener("DOMContentLoaded", check, false);
    };



    var perF = {
        init(cb) {
            // 页面可能只解析完成，没触发load，此时也需统计
            // 可能用户没等加载完成就闭关网页了
            domReady(() => {
                let perfData = performance.timing;
                let data = processData(perfData);
                data.type = "domReady";
                cb(data);
            });
            // 页面加载完成之后才可以计算时间
            load(() => {
                let perfData = performance.timing;
                let data = processData(perfData);
                data.type = "loaded";
                cb(data);
            });
        }
    };

    // 监控页面的性能
    // 监控页面的性能是什么？- 就是算时间差，算一下dns解析用了多久，算一下dom加载用了多久，
    // 算一下整个页面加载完成用了多久。不用自己算，浏览器给了个api，Performance api，

    let img;
    let formatterObj = (data) => {
        let arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`);
        }    return arr.join('&');
    };
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

})));
