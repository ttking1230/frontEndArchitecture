import React from "react";
import ReactDom from "react-dom";

class Form extends React.Component {
    constructor(props){
        super(props);
        this.inputText = React.createRef();
    }
    getFocus= ()=>{
        console.log(this.inputText.current);
        this.inputText.current.getfocus();
    }
    render() {
        return (
            <div>
                <Input ref={this.inputText}/>
                <button onClick={this.getFocus}>获取子组件焦点</button>
            </div>
        )
    }
}
class Input extends React.Component {
    constructor(props){
        super(props);
        this.input = React.createRef();
    }
    getfocus(){
        this.input.current.focus();
        this.input.current.value = "focus"
    }
    render() {
        return <input type="text" ref={this.input}/>
    }
}
ReactDom.render(<Form />,document.getElementById("root"));


