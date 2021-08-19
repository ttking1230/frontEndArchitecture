
import React from "./source/react";
import ReactDom from "./source/react-dom";
// import ReactDom from "react-dom";

// element1 和 element2 一样的，如果按照element1这种写法，
// babel会进行转义，调用React.createElement生成虚拟dom
// element2这种写法，babel不再需要转义，主动调用了React.createElement生成虚拟dom

// 2020-08-16  合成事件
const click = (syntheticEvent) => {
    console.log(syntheticEvent);
    // syntheticEvent.persist();
    setInterval(() => {
        console.log(syntheticEvent);
    }, 1000);
}
//         say<span color="red">hello</span>
//     </button>
// );

let element2 = React.createElement("button", {
    id: 'sayHello',
    onClick: click
}, "say", React.createElement('span', { style: { color: 'red' } }, 'hello'));
console.log(element2);
// console.log(element2);

// 2021-08-19 
// 1、如何渲染类组件和函数组件
// 2、如何实现异步的setState

class ClassCounter extends React.Component {
    render() {
        return React.createElement("div", {
            id: 'counter'
        }, "hello");
    }
}

function FunctionCounter() {
    return React.createElement("div", {
        id: 'counter'
    }, "hello");
}

// 实现批量更新 setState
let element11111 = React.createElement(ClassCounter);
ReactDom.render(element11111, document.getElementById("root"));


