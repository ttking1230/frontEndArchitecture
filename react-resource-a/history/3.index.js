import React from "react";
import ReactDom from "react-dom";


// 组件数据源有两个来源：
// 1、props
// 2、state 状态，内部初始化的，改变状态的唯一方式就是setState
// props 和 state 改变，视图都会更新


// class Clock extends React.Component {
//     constructor (props){
//         super(props);
//         this.state = {
//             date: new Date()
//         }
//     }
//     componentWillMount(){
//         // 组件即将挂载

//     }
//     componentDidMount(){
//         // 组件挂载完成
//         this.$timer = setInterval(()=>{
//             this.setState({date: new Date()})
//         },1000)
//     }
//     render (){
//         return (
//             <div>
//                 <h1>hello world</h1>
//                 <h2>当前时间为：{this.state.date.toLocaleDateString()}</h2>
//                 <h2>当前时间为：{this.state.date.toLocaleString()}</h2>
//                 <h2>当前时间为：{this.state.date.toLocaleTimeString()}</h2>
//             </div>
//         )
//     }
// }
// ReactDom.render(<Clock />, document.getElementById("root"));


// 注意事项：
// 1、不能直接修改state，因为直接修改不会更新视图。
// （setState更改完state之后会去触发render更新视图）
// 2、setState的更新是合并，setState里面传入的对象会和老的state做合并

class Counter extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            name: "计时器",
            number: 0
        }
    }
    componentWillMount(){
        // 组件即将挂载

    }
    componentDidMount(){
        // 组件挂载完成
        // this.$timer = setInterval(()=>{
        //     this.setState({date: new Date()})
        // },1000)
    }
    // onclick事件this丢失的问题，三种方法：
    // 1、bind
    // 2、匿名函数 <button onClick={()=> this.handler()}>+</button>
    // 2、类的属性 es7 this永远指向的是当前的实例
    // handler = ()=>{}
    handler(){
        // 此处只更改number，但是name属性不会更改，不会丢失
        this.setState({
            number: this.state.number+1
        })
    }
    render (){
        return (
            <div>
                <h1>{this.state.name}：{this.state.number}</h1>
                <button onClick={this.handler.bind(this)}>+</button>
            </div>
        )
    }
}
ReactDom.render(<Counter />, document.getElementById("root"));