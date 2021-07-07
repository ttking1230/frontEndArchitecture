
// 发布订阅模式来实现异步并发

function EventEmitter() {
    this._events = [];
}
EventEmitter.prototype.on = function (fn) {
    this._events.push(fn);
}
EventEmitter.prototype.emit = function () {
    this._events.forEach(fn => fn.apply(this, arguments));
}

let e = new EventEmitter();
let fs = require("fs");
fs.readFile("./name.txt", "utf8", function (err, data) {
    if (err) return console.log(err);
    console.log(data);
    e.emit(data, "name");
});
fs.readFile("./age.txt", "utf8", function (err, data) {
    if (err) return console.log(err);
    console.log(data);
    e.emit(data, "age");
});

let school = {};
e.on(function (data, key) {
    school[key] = data;
    if (Object.keys(school).length === 2) {
        console.log("并发全部完成");
        console.log(school);
    }
});
console.log("同步代码先执行");



// 前端面试中经常问的两种模式：发布订阅、观察者模式
// 观察者模式更高级，包含发布订阅模式


