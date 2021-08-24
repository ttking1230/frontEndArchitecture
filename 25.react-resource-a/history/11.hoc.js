
import React from "react";
import ReactDom from "react-dom";

// 高阶组件可以实现逻辑复用，如果复用逻辑比较多的话，会难以维护
// 受控组件：input的value值受状态控制
// 非受控组件：input的value值不受状态控制

class UserName extends React.Component {
    state = {
        name: ""
    }
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            name: event.target.value
        })
    }
    handleClick = ()=>{
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <input value={this.state.name} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}

class PassWord extends React.Component {
    state = {
        pwd: ""
    }
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            pwd: event.target.value
        })
    }
    handleClick = ()=>{
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <input value={this.state.pwd} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}

function HighOrderComponent (OldComponent,fileName){
    return class extends React.Component {
        state = {value:""};
        componentDidMount(){
            // this.state[key] = "";
        }
        handleChange = (event) => {
            console.log(event.target.value)
            this.setState({
                value: event.target.value
            })
        }
        handleClick = ()=>{
            console.log(this.state);
        }
        render() {
            return <OldComponent value={this.state.value} handleChange={this.handleChange}/>
        }
    }
}
class FileComponent extends React.Component {
    render(){
        return (
            <div>
                <input value={this.props.value} onChange={this.props.handleChange}/>
                <p>{this.props.value}</p>
            </div>
        )
    }
}

let CreateUserName = HighOrderComponent(FileComponent,"userName");
let CreatePassword = HighOrderComponent(FileComponent,"pwd");
ReactDom.render(<><CreateUserName /><CreatePassword /></>, document.getElementById("root"));


