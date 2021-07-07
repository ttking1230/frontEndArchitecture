
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

Promise.prototype.then = function (onfulfilled, onrejected) {
    console.log("------------------------");
    let self = this;
    // then返回一个新的promise
    let promise2 = new Promise(function (resolve, reject) {
        if (self.status === "fulfilled") {
            // setTimeout的意义：此时promise2还未定义
            setTimeout(() => {
                let x = onfulfilled(self.value);
                // resolve(x);
                // 此处多处需要处理回调的返回值,所以单独一个方法处理,还可以逻辑复用
                resolvePromise(promise2, x, resolve, reject);
            });
        }
        if (self.status === "rejected") {
            setTimeout(() => {
                let x = onrejected(self.reason);
                resolvePromise(promise2, x, resolve, reject);

            });
        }
        if (self.status === "pendding") {
            self.onResolveCallbacks.push(function () {
                setTimeout(() => {
                    let x = onfulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                });

            });
            self.onRejectCallbacks.push(function () {
                setTimeout(() => {
                    let x = onrejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
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

}


























module.exports = Promise;