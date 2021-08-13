
import React from "react";
import ReactDom from "react-dom";

// element1 和 element2 一样的，如果按照element1这种写法，
// babel会进行转义，调用React.createElement生成虚拟dom
// element2这种写法，babel不再需要转义，主动调用了React.createElement生成虚拟dom
let element1 = <h1 id="title">hello</h1>;

let element2 = React.createElement("h1", {
    id: 'title'
}, "hello");
console.log(element1);
console.log(element2);

ReactDom.render(<h1>hello</h1>, document.getElementById("root"));


