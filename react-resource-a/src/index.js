
import React from "./source/react";
// import ReactDom from "react-dom";

// element1 和 element2 一样的，如果按照element1这种写法，
// babel会进行转义，调用React.createElement生成虚拟dom
// element2这种写法，babel不再需要转义，主动调用了React.createElement生成虚拟dom
const click = () => {
    console.log("say hello");
}
// let element1 = (
//     <button id='sayHello' onClick={click}>
//         say<span color="red">hello</span>
//     </button>
// );

let element2 = React.createElement("button", {
    id: 'sayHello',
    onClick: click
}, "say", React.createElement('span', { color: 'red' }, 'hello'));
console.log(element2);
// console.log(element2);

// ReactDom.render(element2, document.getElementById("root"));


