
// 发布订阅模式来实现异步并发



let fs = require("fs");

fs.readFile("./name.txt", "utf8", function (err, data) {
    if (err) return console.log(err);
    console.log(data);

});
fs.readFile("./age.txt", "utf8", function (err, data) {
    if (err) return console.log(err);
    console.log(data);
});

console.log("同步代码先执行");



// 前端面试中经常问的两种模式：发布订阅、观察者模式
// 观察者模式更高级，包含发布订阅模式


