import { isObject } from "@vue/shared";
import {
    mutableHandlers,
    shallowReactiveHandlers,
    readonlyHandlers,
    shallowReadonlyHandlers
} from "./baseHandlers";

export function reactive(target) {
    // creatReactiveObject第二个参数表示是否只读
    return creatReactiveObject(target, false, mutableHandlers);
}

export function shallowReactive(target) {
    return creatReactiveObject(target, false, shallowReactiveHandlers);
}

export function readonly(target) {
    return creatReactiveObject(target, true, readonlyHandlers);
}

export function shallowReadonly(target) {
    return creatReactiveObject(target, true, shallowReadonlyHandlers);
}

// WeakMap会自动垃圾回收，不会造成内存泄漏，存储的key只能是对象
// 而map如果key是对象的话，就算对象被清除，但是map还会保存着对对象的一次引用，会造成内存泄漏
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
export function creatReactiveObject(target, isReadonly, baseHandlers) {
    if (!isObject(target)) {
        return target;
    }

    // 只需要代理一次，避免重复代理。可能是深度代理，可能是只读代理
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;

    const existProxy = proxyMap.get(target);
    if (existProxy) {
        // 已经被代理过，直接返回缓存中的代理对象
        return existProxy;
    }
    const proxy = new Proxy(target, baseHandlers);

    proxyMap.set(target, proxy);
    return proxy;
}