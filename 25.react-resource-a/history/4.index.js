import React from "react";
import ReactDom from "react-dom";

// ref  reference:引用的意思
// ref 允许访问DOM节点或者创建的组件实例
// ref 可以是 
// 字符串 this.refs.b = dom
// 函数   this.result = dom
// 对象(主流用法)  this.aaa.current = dom，支持函数式组件，上面两种只支持类组件


class Counter extends React.Component {
    constructor(props){
        super(props);
        this.aaa = React.createRef(); //{current:null}
        console.log(this.aaa);
    }
    handler=()=>{
        console.log(this.aaa.current.value);
        this.result.value = parseFloat(this.aaa.current.value) +parseFloat(this.refs.b.value)
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.aaa}/> + 
                <input type="text" ref="b"/>
                <button onClick={this.handler}> = </button>
                <input type="text" ref={inst=>this.result = inst}/>
            </div>
        )
    }
}
ReactDom.render(<Counter />,document.getElementById("root"));