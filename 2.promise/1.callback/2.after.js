

// lodash debounce防抖 throttle节流


// 函数调用三次才会执行
let newFn = after(3, function () {
    console.log("after");
});
newFn();
newFn();
newFn();
// newFn();

function after(times, fn) {
    // 此处闭包，作用域不销毁，times 和 number 不销毁
    let number = 1;
    return function () {
        // if (times === number) {
        //     fn.apply(fn, arguments);
        // }
        // number++;
        // 在前面是先自检，在后面是后自检，只记先后自检自家
        if (--times === 0) {
            fn.apply(fn, arguments);
        }
    }
}

export default {
    after
};



