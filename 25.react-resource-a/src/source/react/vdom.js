import { ELEMENT, TEXT, CLASS_COMPONENT, FUNCTION_COMPONENT } from "./constants";
import { onlyOne, setProps, flatten } from './utils';

export function ReactElement($$typeof, type, key, ref, props) {
    let element = {
        $$typeof, type, key, ref, props
    }
    return element;
}

export function createDom(element) {
    element = onlyOne(element);//为什么要这么写？children是一个数组
    console.log(element);
    let { $$typeof } = element;
    let dom = null;
    if (!$$typeof) {
        // element是一个字符串或者数字，ReactDom.render('hello', document.getElementById("root"));
        dom = document.createTextNode(element);
    } else if ($$typeof == TEXT) {
        dom = document.createTextNode(element.content);
    } else if ($$typeof == ELEMENT) {
        dom = createNativeDOM(element);
    } else if ($$typeof == CLASS_COMPONENT) {
        dom = createClassComponentDOM(element);
    } else if ($$typeof == FUNCTION_COMPONENT) {
        dom = createFunctionComponentDOM(element);
    }
    element.dom = dom;
    return dom;
}

export function createNativeDOM(element) {
    let { type, props } = element;
    let dom = document.createElement(type);
    // 1、创建子节点
    createNativeDOMChildren(dom, props.children);
    // 2、添加属性
    setProps(dom, props);
    return dom;
}

export function createNativeDOMChildren(parentNode, children) {
    // flat(Infinity) 多维数组打平，子节点可能是多维数组
    // children.flat(Infinity) 改为 flatten(children)
    children && flatten(children).forEach((child, index) => {
        // child是虚拟dom，会在虚拟dom上面增加一个属性_mountIndex，
        // 指向此虚拟dom节点在父节点中的索引，dom-diff的时候用到
        child._mountIndex = index;
        let childDom = createDom(child);
        parentNode.appendChild(childDom);
    });
}

// 创建类组件对应的真实的dom元素
export function createClassComponentDOM(element) {
    debugger;
    let { type: ClassCounter, props } = element;
    let componentInstance = new ClassCounter(props);
    // 创建类组件实例后，会在类组件的虚拟dom对象上添加一个属性componentInstance，
    // 指向类组件实例。以后运行当中componentInstance是不变的
    element.componentInstance = componentInstance;
    let renderElement = componentInstance.render();
    console.log(renderElement);
    // 在类组件实例上添加属性renderElement，指向上一次要渲染的虚拟dom节点，
    // 组件更新的时候，会重新render，然后跟上一次的renderElement进行dom-diff
    componentInstance.renderElement = renderElement;
    let newDOM = createDom(renderElement);
    // 给虚拟dom添加一个属性dom，为此虚拟dom创建出来的真实dom，做更新的时候用
    renderElement.dom = newDOM;
    // 重点：element.componentInstance.renderElement.dom = div(真实dom)
    return newDOM;
}
// 创建函数组件对应的真实的dom元素
export function createFunctionComponentDOM(element) {
    let { type, props } = element;
    let renderElement = type(props);
    element.renderElement = renderElement;
    let newDOM = createDom(renderElement);
    // 给虚拟dom添加一个属性dom，为此虚拟dom创建出来的真实dom，做更新的时候用
    renderElement.dom = newDOM;
    return newDOM;
}

export function compareTwoElements(oldRenderElement, newRenderElement) {
    oldRenderElement = onlyOne(oldRenderElement);
    newRenderElement = onlyOne(newRenderElement);
    let currentDOM = oldRenderElement.dom;//先取出老的dom节点
    let currentElement = oldRenderElement;
    if (newRenderElement == null) {
        currentDOM.parentNode.removeChild(currentDOM);
        currentElement = null;
    } else if (oldRenderElement.type != newRenderElement.type) {
        // 原先span、div变为其他的。即节点类型不同，需要创建新的dom节点，然后把老的dom节点替换掉
        let newDOM = createDom(newRenderElement);
        currentDOM.parentNode.replaceChild(newDOM, currentDOM);
        currentElement = newRenderElement;
    } else {
        // 新老节点类型一样，需要dom-diff，todo，暂时暴力一点
        let newDOM = createDom(newRenderElement);
        currentDOM.parentNode.replaceChild(newDOM, currentDOM);
        currentElement = newRenderElement;
        updateElement(oldRenderElement, newRenderElement);

    }
}

function updateElement(oldElement, newElement) {

}