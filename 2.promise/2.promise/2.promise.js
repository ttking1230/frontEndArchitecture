
// 有一个串行的需求，先读取name.txt，根据name.txt的内容再读取其他的txt
// 不使用promise的话，会出现回调地狱的问题，如下：
// fs.readFile("./name.txt", "utf8", function (err, data) {
//     if (err) return reject(err);
//     fs.readFile(data, "utf8", function (err, data) {
//         if (err) return reject(err);
//         fs.readFile(data, "utf8", function (err, data) {
//             if (err) return reject(err);
//             fs.readFile(data, "utf8", function (err, data) {
//                 if (err) return reject(err);
//             });
//         });
//     });
// });
// 用promise重写这个功能，能解决回调地狱的问题
// 用到的是then的链式调用，jquery也有链式调用，jquery的实现是返回this，而promise不是

let Promise = require("./promise/promise2");

let fs = require("fs");

function read(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile(url, "utf8", function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

// 1）如果then的onfulfilled返回的是一个promise的话，会自动让这个promise执行
// 并且采用返回的promise的状态作为下一个then的状态，并把值传递给then。promise走resolve，
// 那么下一个then走onfulfilled，promise走reject，那么下一个then走onrejected
// 2）如果then的onfulfilled返回的是一个普通值的话（包括undefined，因为一个函数默认就是返回的undefined），
// 那么永远会走then的onfulfilled，并把值传递给then。所以then链式调用不论多少，只要不返回promise
// 那么永远都走下一个then的成功的回调onfulfilled
// 3）then返回promise时，下一个then想走失败的回调的话，只需要promise reject即可。
// 如果then返回普通值时，下一个then想走失败的回调的话，需要 throw new Error()
// 如果上一个then走了onrejected，onrejected如果返回普通值的话，会走下一个then的成功的回调。
// onrejected和onfulfilled一样，
// 返回promise的话，promise的状态也会作为下一个then的状态

// then的链式调用，jquery也有链式调用，jquery的实现是返回this，而promise不是
// then返回的是新的promise new Promise，因为promise状态一旦更改就不会变化，所以必须返回一个新的promise

read("./name.txt").then(data => {
    return read(data + "0");
}).then(data => {
    console.log(data + "1s");
}, err => {
    console.log(err + "1f");
}).then(data => {
    console.log(data + "2s");
}, err => {
    console.log(err + "2f");
});