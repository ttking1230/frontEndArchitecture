
import React from "react";
import ReactDom from "react-dom";

// HOC hign order component 高阶组件
// HOF hign order function 高阶函数：函数作为参数传递或者作为返回值

// 高阶组件：接收老组件，返回新组件

function withHOC(OldComponent) {
    return class extends React.Component {
        start = null;//这种写法和在constructor里面写this.start = null 一样
        componentWillMount() {
            this.start = Date.now();
        }
        componentDidMount() {
            console.log(Date.now() - this.start);
        }
        render() {
            return <OldComponent {...this.props} />
        }
    }
}

class Hello extends React.Component {
    render() {
        return (
            <div>hello {this.props.id}</div>
        )
    }
}

let NewComponent = withHOC(Hello);

ReactDom.render(<NewComponent id="react" />, document.getElementById("root"));


