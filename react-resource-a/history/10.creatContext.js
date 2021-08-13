
import React from "react";
import ReactDom from "react-dom";

// globalContext = {Provider,Consumer}
// React.createContext() 返回一个对象，里面有两个属性Provider,Consumer
// Provider 提供者  Consumer 消费者
let GlobalContext = React.createContext();
console.log(GlobalContext);
class Header extends React.Component {
    static contextType = GlobalContext;
    render() {
        return (
            <div style={{ border: `5px solid ${this.context.color}`, padding: "10px", margin: "10px" }}>
                Header
                <Title />
            </div>
        )
    }
}
// class Title extends React.Component {
//     static contextType = GlobalContext;
//     render() {
//         return (
//             <div style={{ border: `5px solid ${this.context.color}`, padding: "10px", margin: "10px" }}>
//                 Title
//             </div>
//         )
//     }
// }
// 当其中一个组件为函数组件时，React.createContext()的用法如何？
function Title(props) {
    return (
        <GlobalContext.Consumer>
            {
                value => (
                    <div style={{ border: `5px solid ${value.color}`, padding: "10px", margin: "10px" }}>
                        Title
                    </div>
                )
            }
        </GlobalContext.Consumer>

    )
}

class Main extends React.Component {
    static contextType = GlobalContext;
    render() {
        return (
            <div style={{ border: `5px solid ${this.context.color}`, padding: "10px", margin: "10px" }}>
                Main
                <Content />
            </div>
        )
    }
}
class Content extends React.Component {
    // 给类组件添加一个静态属性contextType，指向GlobalContext（React.createContext()所创建）、
    // 然后这个类组件实例上面会多一个context属性,context即是Provider里面的value
    // 使用时 this.context.color
    static contextType = GlobalContext;
    render() {
        // console.log(context);
        return (
            <div style={{ border: `5px solid ${this.context.color}`, padding: "10px", margin: "10px" }}>
                Content
                <button onClick={() => this.context.changeColor("red")}>红色</button>
                <button onClick={() => this.context.changeColor("green")}>绿色</button>
            </div>
        )
    }
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "red"
        }
    }
    changeColor = (color) => {
        this.setState({
            color
        });
    }
    render() {
        let value = {
            color: this.state.color,
            changeColor: this.changeColor
        }
        return (
            <GlobalContext.Provider value={value}>
                <div style={{ border: `5px solid ${this.state.color}`, width: "300px", padding: "10px", margin: "10px" }}>
                    Page
                    <Header />
                    <Main />
                </div>
            </GlobalContext.Provider>
        )
    }
}

ReactDom.render(<Page />, document.getElementById("root"));


