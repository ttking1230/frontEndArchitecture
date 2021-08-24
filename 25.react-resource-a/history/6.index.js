import { func } from "prop-types";
import React from "react";
import ReactDom from "react-dom";


// 函数组件不能够使用ref，因为函数组件没有实例
// 函数组件要使用 forwardRef 转发ref
// ref转发 是一项 通过组件传递到子组件的技巧
// 转发的时候允许函数组件接受ref，并向子组件传递

function Input(props, ref) {
    return <input type="text" ref={ref} />
}
let InputText = React.forwardRef(Input);
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = React.createRef();
    }
    getFocus = () => {
        console.log(this.inputText.current);
        this.inputText.current.focus();
        this.inputText.current.value = "focus"
    }
    render() {
        return (
            <div>
                <InputText ref={this.inputText} />
                <button onClick={this.getFocus}>获取子组件焦点</button>
            </div>
        )
    }
}

ReactDom.render(<Form />, document.getElementById("root"));


