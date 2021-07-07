

function Promise(executor) {
    // 给promise定义状态
    this.status = "pendding";
    // 成功和失败的原因
    this.value = undefined;
    this.reason = undefined;
    let self = this;
    // 定义两个队列，存放对应的（then的回调onfulfilled, onrejected，用来处理异步）回调
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

    // 执行器会立即执行
    try {
        executor(resolve, reject);
    } catch (err) {
        // 如果报错，主动调用reject，会走then的onrejected
        reject(err);
    }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
    console.log("------------------------");
    let self = this;
    if (self.status === "fulfilled") {
        onfulfilled(self.value);
    }
    if (self.status === "rejected") {
        onrejected(self.reason);
    }
    // 状态如果是pendding，说明是异步，需要将成功onfulfilled和失败onrejected的回调存起来
    // 当executor的resolve和reject执行的时候，再将成功和失败的队列取出来调用，使用的是发布订阅
    if (self.status === "pendding") {
        // self.onResolveCallbacks.push(onfulfilled);
        // self.onRejectCallbacks.push(onrejected);
        // 这种写的好处是1、在此处可以直接传参数，2、还有其他逻辑
        self.onResolveCallbacks.push(function () {
            onfulfilled(self.value);
        });
        self.onRejectCallbacks.push(function () {
            onrejected(self.reason);
        });
    }
}


























module.exports = Promise;