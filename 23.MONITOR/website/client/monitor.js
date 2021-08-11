(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    var xhr = {
        init(cb) {
            // http一般两种：fetch 和 xhr,此处只实现xhr
            let xhr = window.XMLHttpRequest;
            console.log(xhr);
            // 代理模式，重写xhr open,send 方法
            let oldOpen = xhr.prototype.open;
            xhr.prototype.open = function (method, url, async, username, password) {
                this.info = {
                    method, url, async, username, password
                };
                return oldOpen.apply(this, arguments);
            };
            let oldSend = xhr.prototype.send;
            xhr.prototype.send = function (value) {
                let start = Date.now();
                let fn = (type) => () => {
                    this.info.time = Date.now() - start;
                    this.info.value = value; //请求体
                    this.info.requestSize = value ? value.length : 0; //请求体的长度
                    this.info.responseSize = this.responseText.length; //响应体的长度
                    this.info.type = type;
                    cb(this.info);
                };
                this.addEventListener("load", fn('load'), false);
                this.addEventListener("error", fn('error'), false);
                this.addEventListener("abort", fn('abort'), false);
                return oldSend.apply(this, arguments);
            };

            // window.fetch fetch实现
        }
    };

    var errCatch = {
        init(cb) {
            // 捕获页面报错
            window.onerror = function (message, source, lineno, colno, error) {
                console.dir(error);
                let info = {
                    name: error.name,
                    message: error.message
                };
                let stack = error.stack;
                let matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
                console.log(matchUrl);
                info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0];
                console.log(info.filename);
                let [, row, column] = matchUrl.match(/:(\d+):(\d+)/);
                info.row = row;
                info.column = column; //线上代码压缩，通过source-map 找到对应的真实位置
                console.log(info);
                cb(info);
            };
            // 图片或者其他静态资源404的时候，并不会走window.onerror，需要使用window.addEventListener('error',fn,true);
            // promise 失败不能通过onerror，要使用 onhanddler...捕获
        }
    };

    xhr.init((data) => {
        console.log(data);
    });
    errCatch.init((data) => {
        console.log(data);
    });
    // 5、监控用户的行为

})));
