
// after来实现异步并发
// 通过计数次数



function after(times, fn) {
    let result = {};
    return function (key, value) {
        result[key] = value;
        if (--times === 0) {
            console.log(result);
            fn(result);
        }
    }
}
// paralle：并发
// 并发调用接口，两个ajax请求，保存两个返回后的结果

let school = {};

let fs = require("fs");

let newFn = after(2, function (data) {
    console.log(data);
    // let [name, age] = [...arguments];
    // school[name] = name;
    // school[age] = age;
    // console.log(school);
});


fs.readFile("./name.txt", "utf8", function (err, data) {
    if (err) return console.log(err);
    // console.log(data);
    // school.name = data;
    newFn("name", data);
});
fs.readFile("./age.txt", "utf8", function (err, data) {
    if (err) return console.log(err);
    // console.log(data);
    // school.age = data;
    newFn("age", data);
});

console.log("同步代码先执行");

// console.log(school);


// 并行 两个人没有关系，可以一起执行
// 串行 两个人有关系，上一个的输出是下一个的输入

// 前端面试中经常问的两种模式：发布订阅、观察者模式
// 观察者模式更高级，包含发布订阅模式