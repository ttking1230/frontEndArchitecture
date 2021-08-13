/**
    vdom: 要渲染的虚拟dom
    container: 要把虚拟dom转换成真实的dom，并插入到container容器中
**/

export function render(vdom, container) {
    if (typeof vdom === "string" || typeof vdom === "number") {
        return container.appendChild(document.createTextNode(vdom));
    }
    let { type, props } = vdom;
    console.log(type);
    if (typeof type === "function" && type.isReactComponent) {
        let componentInstance = new type(props);
        vdom = componentInstance.render();
        type = vdom.type;
        props = vdom.props;
    } else if (typeof type === "function") {
        // 函数组件
        vdom = type(props);
        type = vdom.type;
        props = vdom.props;
    }
    let dom = createDom(type, props);
    container.appendChild(dom);
}

function createDom(type, props) {
    let dom = document.createElement(type);
    for (let propName in props) {
        if (propName === "children") {
            // 递归调用解析children
            props.children.forEach(child => render(child, dom));
        } else if (propName === "className") {
            dom[propName] = props[propName];
        } else if (propName === "style") {
            for (let attr in props[propName]) {
                dom[propName][attr] = props[propName][attr];
            }
        } else {
            dom.setAttribute(propName, props[propName]);
        }
    }
    return dom;
}

export default {
    render
}