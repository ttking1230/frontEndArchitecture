
// get和set需要区分是不是只读的，是不是深度的

import { extend, hasChanged, hasOwn, isArray, isIntergerKey, isObject } from "@vue/shared";
import { reactive, readonly } from ".";
import { track, trigger } from "./effect";
import { TrackOpType, TriggerOpType } from "./operator";

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

        if (!isReadonly) {
            // 依赖收集，数据变化后更新对应的视图
            // 执行effect时会触发getter，此时将effect和数据做关联（依赖收集）
            console.log("执行effect时会触发getter，，收集effect");
            track(target, TrackOpType.GET, key);
        }

        if (shallow) {
            return res;
        }

        if (isObject(res)) {
            // vue2是一上来就递归遍历
            // vue3是取值时才会进行代理，懒代理模式
            return isReadonly ? readonly(res) : reactive(res);
        }

        return res;
    }
}

function creatSetter(shallow = false) {
    return function set(target, key, value, receiver) {

        // 当数据更新时，通知对应属性的effect重新执行（派发更新）
        // 区分新增和修改
        // vue2中无法监控数组更改索引,数组长度的变化,使用了hack的方法,单独处理的
        const oldValue = target[key];//获取老值

        let hasKey = isArray(target) && isIntergerKey(key) ? Number(key) < target.length :
            hasOwn(target, key);

        const result = Reflect.set(target, key, value, receiver);

        if (!hasKey) {
            // 新增
            trigger(target, TriggerOpType.ADD, key, value);
        } else if (hasChanged(oldValue, value)) {
            // 修改
            trigger(target, TriggerOpType.SET, key, value, oldValue);
        }

        return result;
    }
}