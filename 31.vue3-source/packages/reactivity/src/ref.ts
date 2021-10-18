
// ref和reactive的区别？
// ref内部实现使用的是defineProperty
// reactive内部实现使用的是Proxy
export function ref(value) {
    // 将普通类型，转化成一个对象{}
    return createRef(value);
}

export function shallowRef(value) {
    return createRef(value, true);
}

class RefImpl {
    public _value;
    constructor(rawValue, shallow) {
        this._value = rawValue;
    }
}
function createRef(rawValue, shallow = false) {
    // vue3 beta版本返回的是一个对象，正式版改成了实例
    return new RefImpl(rawValue, shallow);
}