

// 合成事件，并不是把事件绑定到DOM节点上，而是绑定到了document上，类似事件委托
// 优点：
// 1、合成事件可以屏蔽浏览器的差异。不同浏览器的绑定事件和触发事件不一样，原生事件有兼容性问题
// 2、合成事件可以实现事件对象的复用，减少垃圾回收，提高性能
// 3、最重要的一点：react要实现批量更新 多次调用hooks，如setState，会合并成一次更新

export function addEvent(dom, eventType, listener) {
    eventType = eventType.toLowerCase(); // onClick => onclick
    // 在要绑定的dom节点上挂载一个对象，存放着监听函数
    let enevtStore = dom.eventStore || (dom.eventStore = {});
    enevtStore[eventType] = listener;
    // document.addEventListener('click'):截取2个字符之后的
    // 事件执行有两个阶段：第一个阶段是捕获，第二个阶段是冒泡，，false即为在冒泡阶段处理事件
    document.addEventListener(eventType.slice(2), dispatchEvent, false);
}
let syntheticEvent;
function dispatchEvent(event) {
    let { type, target } = event;  // type = click  target = button
    let eventType = "on" + type; // onclick
    // 在此处给syntheticEvent赋值
    syntheticEvent = getSyntheticEvent(event);
    // 模拟事件冒泡
    while (target) {
        let { eventStore } = target;
        let listener = eventStore && eventStore[eventType];// onclick
        if (listener) {
            // 执行监听函数
            listener.call(target, syntheticEvent);
        }
        target = target.parentNode;
    }
    // 等所有的监听函数执行完成后，清除掉所有的属性，供下次复用此syntheticEvent
    for (let key in syntheticEvent) {
        if (key != 'persist') {
            syntheticEvent[key] = null;
        }
    }
}

// persist 持久化(不销毁syntheticEvent合成事件上面的方法和属性)
// 实现原理：让syntheticEvent指向了新对象，while结束之后清掉的是新对象，原先已经传过去的事件得以保留
// https://blog.csdn.net/wujunlei1595848/article/details/90370943 
// 不管函数传入的是什么数据类型，都是按值传递的。也可以说为传递的是 栈内存中变量存储的值或地址
// 函数参数按值传递
function persist() {
    syntheticEvent = { persist };
}

function getSyntheticEvent(nativeEvent) {
    if (!syntheticEvent) {
        syntheticEvent = { persist };
    }
    syntheticEvent.nativeEvent = nativeEvent;
    syntheticEvent.currentTarget = nativeEvent.target;
    // 把原生事件上的方法和属性都拷贝到合成事件对象上
    // 防止函数上下文出现问题，做个绑定
    for (let key in nativeEvent) {
        if (typeof nativeEvent[key] == "function") {
            syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
        } else {
            syntheticEvent[key] = nativeEvent[key];
        }
    }
    return syntheticEvent;
}