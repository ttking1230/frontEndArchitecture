/**
    type: 元素类型
    config: 配置对象
    children: 子元素
**/

import { TEXT, ELEMENT } from './constants';
import { ReactElement } from './vdom';
export function createElement(type, config = {}, ...children) {
    delete config.__source;
    delete config.__self;
    const { key, ref, ...props } = config;
    let $$typeof = null;
    if (typeof type === 'string') {
        $$typeof = ELEMENT;
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
    createElement
}
export default React;