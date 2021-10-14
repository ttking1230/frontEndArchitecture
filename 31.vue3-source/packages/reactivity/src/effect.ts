

export function effect(fn, options: any = {}) {
    // 需要将effect变成响应式的，需要做到数据变化重新执行

    const effect = createReactiveEffect(fn, options);
    effect();
    return effect;
}

let uid = 0;
let activeEffect;//存储当前正在 运行的effect
const effectStack = [];//函数调用是一个栈型结构，避免effect嵌套使用时调用顺序发生错乱
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        // 避免effect中使用++运算符，造成死循环
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect);
                activeEffect = effect;
                return fn();// 函数执行时，如果有对响应式数据的操作，会执行代理的get方法
            } finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }

    }
    effect.id = uid++;//标识，用于区分effect
    effect.raw = fn;
    effect.options = options;
    return effect;
}


let targetMap = new WeakMap();
// 让某个对象中的属性收集当前自己对应的effect函数（依赖收集）
export function track(target, type, key) {
    if (activeEffect === undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
    console.log(targetMap);
}

// ts ? 表示可传可不传
export function trigger(target, type, key?, newValue?, oldValue?) {
    console.log("trigger", target, type, key, newValue, oldValue);

}