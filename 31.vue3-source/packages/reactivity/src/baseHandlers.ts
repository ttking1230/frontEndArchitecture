
// get和set需要区分是不是只读的，是不是深度的

import { extend } from "@vue/shared";

const get = creatGetter();
const shallowReactiveGet = creatGetter(false, true);
const readonlyGet = creatGetter(true);
const shallowReadonlyGet = creatGetter(true, true);

const set = creatSetter();
const shallowSet = creatSetter(true);

const readonlySetObj = {
    set: (target, key) => {
        // 只读的话，不能赋值修改
        console.warn(`set on ${key} failed`);
    }
}

export const mutableHandlers = {
    get,
    set
};
export const shallowReactiveHandlers = {
    get: shallowReactiveGet,
    set: shallowSet
};
export const readonlyHandlers = extend({
    get: readonlyGet
}, readonlySetObj);
export const shallowReadonlyHandlers = extend({
    get: shallowReadonlyGet
}, readonlySetObj);

function creatGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {

        // 后续Object上面的方法会迁移到Reflect上面
        // 以前target[key] = value 这种方式设置值可能会失败，并不会报异常，也没有返回值标识

        const res = Reflect.get(target, key, receiver);
        return res;
    }
}

function creatSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        return result;
    }
}