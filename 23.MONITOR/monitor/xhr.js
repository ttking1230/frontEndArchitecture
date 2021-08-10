

export default {
    init(cb) {
        // http一般两种：fetch 和 xhr,此处只实现xhr
        let xhr = window.XMLHttpRequest;
        console.log(xhr);
        // 代理模式，重写xhr open,send 方法
        let oldOpen = xhr.prototype.open;
        xhr.prototype.open = function (method, url, async, username, password) {
            this.info = {
                method, url, async, username, password
            }
            return oldOpen.apply(this, arguments);
        }
        let oldSend = xhr.prototype.send;
        xhr.prototype.send = function (value) {
            let start = Date.now();
            let fn = (type) => () => {
                this.info.time = Date.now() - start;
                this.info.value = value; //请求体
                this.info.requestSize = value ? value.length : 0; //请求体的长度
                this.info.responseSize = this.responseText.length; //响应体的长度
                this.info.type = type;
                cb(this.info);
            }
            this.addEventListener("load", fn('load'), false);
            this.addEventListener("error", fn('error'), false);
            this.addEventListener("abort", fn('abort'), false);
            return oldSend.apply(this, arguments);
        }

        // window.fetch fetch实现
    }
}