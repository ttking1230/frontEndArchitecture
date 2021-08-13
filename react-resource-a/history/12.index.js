
import React from "react";
import ReactDom from "react-dom";


// class MouseTracker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             x: 0,
//             y: 0
//         }
//     }
//     handleMouse = (event) => {
//         this.setState({
//             x: event.clientX,
//             y: event.clientY
//         })
//     }
//     render() {
//         let style = {
//             height: "500px",
//             border: "1px solid red"
//         }
//         return (
//             <div style={style} onMouseMove={this.handleMouse}>
//                 <h1>移动鼠标</h1>
//                 <p>位置{this.state.x},{this.state.y}</p>
//             </div>
//         )
//     }
// }

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
    }
    handleMouse = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    render() {
        let style = {
            height: "500px",
            border: "1px solid red"
        }
        return (
            <div style={style} onMouseMove={this.handleMouse}>
                {this.props.render(this.state)}
            </div>
        )
    }
}

// // 实现复用第一种方式：1、组件的儿子children是一个函数
// ReactDom.render(<MouseTracker>
//     {
//         props => (
//             <>
//                 <h1>移动鼠标</h1>
//                 <p>位置{props.x},{props.y}</p>
//             </>
//         )
//     }
// </MouseTracker>, document.getElementById("root"));

// 实现复用第二种方式：1、属性的方式
// ReactDom.render(<MouseTracker aaa={
//     props => (
//         <>
//             <h1>移动鼠标</h1>
//             <p>位置{props.x},{props.y}</p>
//         </>
//     )
// } />, document.getElementById("root"));


// 实现复用第三种方式：1、高阶组件
let oldCom = props => (
    <>
        <h1>{props.title}</h1>
        <h1>移动鼠标</h1>
        <p>位置{props.x},{props.y}</p>
    </>
)
function WithHOC(OldComponent) {
    return props=>(<MouseTracker render={value => <OldComponent {...props} {...value} />} />)
}

let NewCom = WithHOC(oldCom);

ReactDom.render(<NewCom title="react"/>, document.getElementById("root"));


