/**
    type: 元素类型
    config: 配置对象
    children: 子元素
**/


export function createElement(type, config, ...children) {
    // console.log(type);
    let props = {
        ...config
    }
    if (arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2);
    }
    props.children = children;
    return {
        type,
        props
    }
}

// js中并没有类的概念，class编译之后就是一个函数
// 所以为了区分是函数组件还是类组件，在class上增加
// 静态属性，表明是一个类组件
export class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
    }
    // partialState 部分状态的意思
    setState(partialState) {

    }
}


export function forwardRef(functionComponent) {
    return class extends Component {
        render() {
            return functionComponent(this.props, this.props.ref);
        }
    }
}

export default {
    createElement,
    Component,
    forwardRef
}