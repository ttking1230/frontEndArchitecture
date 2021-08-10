
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
    }
    return data;
}

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
    }

    window.addEventListener("load", check, false);
}


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
    }

    window.addEventListener("DOMContentLoaded", check, false);
}



export default {
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
}