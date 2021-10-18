
// ref和reactive的区别？
// reactive 内部实现使用的是Proxy
// ref内部实现使用的是defineProperty

import { hasChanged, isArray, isObject } from "@vue/shared";
import { reactive } from ".";
import { track, trigger } from "./effect";
import { TrackOpType, TriggerOpType } from "./operator";

// reactive内部实现使用的是Proxy
export function ref(value) {
    // 将普通类型，转化成一个对象{}
    return createRef(value);
}

export function shallowRef(value) {
    return createRef(value, true);
}
const convert = (val) => isObject(val) ? reactive(val) : val;
// 类经过babel转义之后就是Object.defineProperty实现的
class RefImpl {
    public _value;
    public __v_isRef = true;
    // public关键字，默认形参绑定到实例上面
    constructor(public rawValue, public shallow) {
        // 如果是深度的话，需要把里面的值都变成响应式的
        this._value = shallow ? rawValue : convert(rawValue);
    }
    // 类的属性访问器
    get value() {
        // 依赖收集，收集effect
        track(this, TrackOpType.GET, "value");
        return this._value;
    }
    set value(newValue) {
        // 派发更新，重新执行effect
        if (hasChanged(newValue, this.rawValue)) {
            this.rawValue = newValue;
            this._value = this.shallow ? newValue : convert(newValue);
            trigger(this, TriggerOpType.SET, "value", newValue, this._value);
        }
    }
}
function createRef(rawValue, shallow = false) {
    // vue3 beta版本返回的是一个对象，正式版改成了实例
    return new RefImpl(rawValue, shallow);
}


class ObjectRefImpl {
    public __v_isRef = true;
    constructor(public target, public key) { }
    get value() {
        // 代理
        return this.target[this.key];
    }
    set value(newValue) {
        this.target[this.key] = newValue;
    }
}

// toRef可以将一个对象的属性变成ref类型
// 不需要track和trigger，只是做了一层代理
export function toRef(target, key) {
    return new ObjectRefImpl(target, key);
}

export function toRefs(object) {
    const res = isArray(object) ? new Array(object.length) : {};
    for (let key in object) {
        res[key] = toRef(object, key);
    }
    return res;
}