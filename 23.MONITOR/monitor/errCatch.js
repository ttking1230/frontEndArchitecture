

export default {
    init(cb) {
        // 捕获页面报错
        window.onerror = function (message, source, lineno, colno, error) {
            console.dir(error);
            let info = {
                name: error.name,
                message: error.message
            }
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
        }
        // 图片或者其他静态资源404的时候，并不会走window.onerror，需要使用window.addEventListener('error',fn,true);
        // promise 失败不能通过onerror，要使用 onhanddler...捕获
    }
}