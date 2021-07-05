

Function.prototype.before = function (fn) {
    let oldFn = this;
    return function () {
        fn();
        oldFn.apply(oldFn,arguments);
    }
}
// 装饰器

function fn() {
    console.log("原先的代码逻辑功能");
}

// aop

// let oldFn = fn;

// fn = function () {
//     oldFn();
//     console.log("增加额外的逻辑");
// }

// fn();

let newFn = fn.before(function () {
    console.log("原有函数执行前执行");
});
newFn();