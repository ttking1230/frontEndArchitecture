
import { addEvent } from './event';
export function onlyOne(obj) {
    return Array.isArray(obj) ? obj[0] : obj;
}

export function setProps(dom, props) {
    for (let key in props) {
        if (key !== "children") {
            let value = props[key];
            setProp(dom, key, value);
        }
    }
}

export function setProp(dom, key, value) {
    if (/^on/.test(key)) {
        // 如果是on开头，说明是click 事件
        // 合成事件，react实现了一套实现事件的机制
        // dom[key.toLowerCase()] = value;
        addEvent(dom, key, value);
    } else if (key === "style") {
        for (let styleName in value) {
            dom.style[styleName] = value[styleName];
        }
    } else {
        dom.setAttribute(key, value);
    }
}

// 打平任意一个数组
export function flatten(array) {
    let flated = [];
    (function flat(array) {
        array.forEach(item => {
            if (Array.isArray(item)) {
                flat(item);
            } else {
                flated.push(item);
            }
        });
    })(array);
    return flated;
}

export function isFunction(obj) {
    return typeof obj === "function";
}