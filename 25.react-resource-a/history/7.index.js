
import React from "react";
import ReactDom from "react-dom";


class Counter extends React.Component {
    static defaultProps = { name: "react" }
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            number: 0
        }
        console.log("1 constructor 构造函数");
    }
    componentWillMount() {
        // 组件将要挂载
        console.log("2 生命周期componentWillMount 组件将要挂载");
    }
    handleClick = () => {
        this.setState({
            number: this.state.number + 1
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("5 生命周期shouldComponentUpdate 询问用户是否要更新，是否要重新渲染");
        console.log(nextProps);
        console.log(nextState);
        // //默认 return true ，更新props state ，重新渲染
        // return false state会更改，但是界面UI不变，不会渲染
        return true;
    }
    componentWillUpdate() {
        // 组件将要更新
        console.log("6 生命周期componentWillUpdate 组件将要更新");
    }
    componentDidUpdate() {
        // 组件更新完成
        console.log("7 生命周期componentDidUpdate 组件更新完成");
    }
    render() {
        console.log("3 render");
        return (
            <div>
                <h1>{this.state.number}</h1>
                <button onClick={this.handleClick}> + </button>
                <h1>
                    {this.state.number > 3 ? null : <SubCounter count={this.state.number} />}
                </h1>
            </div>
        )
    }
    componentDidMount() {
        // 组件挂载完成
        console.log("4 生命周期componentDidMount 组件挂载完成");
    }

}

class SubCounter extends React.Component {
    // 当父组件将要给子组件传递属性的时候，子组件会触发此钩子函数
    componentWillReceiveProps() {
        console.log("1 componentWillReceiveProps 当父组件将要给子组件传递属性的时候，子组件会触发此钩子函数");
    }
    componentWillUnmount() {
        console.log("3 SubCounter 组件将要卸载");
    }
    render() {
        console.log("2 SubCounter render");
        return (
            <div>
                <h1>{this.props.count}</h1>
            </div>
        )
    }
}
ReactDom.render(<Counter />, document.getElementById("root"));


