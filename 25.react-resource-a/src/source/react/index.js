/**
    type: 元素类型
    config: 配置对象
    children: 子元素
**/

import { TEXT, ELEMENT, CLASS_COMPONENT, FUNCTION_COMPONENT } from './constants';
import { ReactElement } from './vdom';
import Component from './component';
export function createElement(type, config = {}, ...children) {
    delete config.__source;
    delete config.__self;
    const { key, ref, ...props } = config;
    let $$typeof = null;
    if (typeof type === 'string') {
        // 原生的dom元素，div、button、span
        $$typeof = ELEMENT;
    } else if (typeof type === 'function' && type.prototype.isReactComponent) {
        // 此类型为类组件
        $$typeof = CLASS_COMPONENT;
    } else if (typeof type === 'function') {
        // 此类型为函数组件
        $$typeof = FUNCTION_COMPONENT;
    }

    props.children = children.map(item => {
        if (typeof item === 'object') {
            return item;
        } else {
            return {
                $$typeof: TEXT,
                type: TEXT,
                content: item
            }
        }
    });
    return ReactElement($$typeof, type, key, ref, props);
}

const React = {
    createElement,
    Component
}
export default React;