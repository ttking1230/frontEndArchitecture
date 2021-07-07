
// promise怎么变成失败态？1、reject 2、new Error

let Promise = require("./promise/promise1");
let promise = new Promise(function (resolve, reject) {
    // resolve("玩具太少");
    setTimeout(() => {
        resolve("玩具太少");
        reject("玩具太多");
    }, 1000);
});
promise.then(function (data) {
    console.log(data + "success");
}, function (err) {
    console.log(err + "fail");
});