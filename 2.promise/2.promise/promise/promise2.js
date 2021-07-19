
// 实现then的链式调用

function Promise(executor) {
    this.status = "pendding";
    this.value = undefined;
    this.reason = undefined;
    let self = this;
    self.onResolveCallbacks = [];
    self.onRejectCallbacks = [];
    function resolve(value) {
        if (self.status === "pendding") {
            self.value = value;
            self.status = "fulfilled";
            self.onResolveCallbacks.forEach(cb => cb());
        }
    }
    function reject(reason) {
        if (self.status === "pendding") {
            self.reason = reason;
            self.status = "rejected";
            self.onRejectCallbacks.forEach(cb => cb());
        }
    }

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

// then中的onfulfilled, onrejected必须异步执行，所以then方法是异步的
Promise.prototype.then = function (onfulfilled, onrejected) {
    console.log("------------my------------");
    // 处理多个then链式调用，不传onfulfilled, onrejected的情况
    // 值的穿透
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : val => val;
    onrejected = typeof onrejected === "function" ? onrejected : err => { throw err };
    let self = this;
    // then返回一个新的promise
    let promise2 = new Promise(function (resolve, reject) {
        if (self.status === "fulfilled") {
            // setTimeout的意义：此时promise2还未定义
            setTimeout(() => {
                // try catch的意义：捕获then回调的new Error()
                try {
                    let x = onfulfilled(self.value);
                    // resolve(x);
                    // 此处多处需要处理回调的返回值,所以单独一个方法处理,还可以逻辑复用
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }
        if (self.status === "rejected") {
            setTimeout(() => {
                try {
                    let x = onrejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);

                } catch (e) {
                    reject(e);
                }
            });
        }
        if (self.status === "pendding") {
            self.onResolveCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);

                    } catch (e) {
                        reject(e);
                    }
                });

            });
            self.onRejectCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let x = onrejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);

                    } catch (e) {
                        reject(e);
                    }
                });

            });
        }
    });
    return promise2;

}

// 处理then的回调返回的是普通值还是promise，逻辑复用
// promise2 是当前then返回的新的promise
// x 是then的成功或者失败回调的返回值
function resolvePromise(promise2, x, resolve, reject) {
    // 对x进行判断，如果x是普通值，直接resolve(x)，因为x为普通值，肯定走下一个then的成功的回调
    // 如果x是一个promise，那promise的状态将作为下一个then的状态

    if (promise2 === x) {
        reject(new TypeError("循环引用，自己不能返回自己"));
    }
    // 此时x可能是一个promise了，此时的几种情况1、promise 2、{then:{}}
    if (x !== null && (typeof x === "function" || typeof x === "object")) {
        try {
            // x是否有then方法，，有可能取then的时候报错，所以要用try catch
            let then = x.then;
            if (typeof then === "function") {
                // 此时是一个promise
                then.call(x, y => {
                    // 递归调用，可能有嵌套返回new Promise的情况
                    // then返回的promise，这个promise可能也resolve一个promise
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            reject(e);
        }
    } else {
        // 此时返回的是一个普通值
        resolve(x);
    }
}

// catch其实就是onfulfilled为null的then函数
Promise.prototype.catch = function (errCallback) {
    // return Promise.prototype.then(null, errCallback);
    return this.then(null, errCallback);
}

// finally：无论如何都会走finally
Promise.prototype.finally = function (errCallback) {
    // return Promise.prototype.then(null, errCallback);
    return this.then(null, errCallback);
}



























module.exports = Promise;