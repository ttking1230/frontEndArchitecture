/**
    vdom: 要渲染的虚拟dom
    container: 要把虚拟dom转换成真实的dom，并插入到container容器中
**/

import { createDom } from "../react/vdom";

export function render(element, container) {
    let dom = createDom(element);
    console.log(dom);
    container.appendChild(dom);
}

export default {
    render
}