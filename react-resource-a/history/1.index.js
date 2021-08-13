import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

// jsx javascript + xml 是一种吧js 和 html混合书写的一种语法
// jsx中标签使用class，需要写成className
// jsx中标签使用style，需要写成使用变量的方式
// 而jsx中使用变量，需要放在大括号内

// let styles = {color:"red"};
// let name = "zhuf";
// ReactDom.render(<h1 className="myh1" style={styles}>
// Hello {name}
// </h1>,
// document.getElementById("root"));





// // 函数式组件
// // 1、一个返回普通react元素的函数就是一个合法的react组件
// // 2、组件需要返回一个并且仅能返回一个react元素(即只能有一个根元素)
// // 3、函数名第一个字母大写
// function Mycom(props){
//     return <h1>{props.name} <span>{props.age}</span></h1>
// }
// // ReactDom.render(<Mycom name="zhu" age={10}/>,document.getElementById("root"));

// let data = {
//     name: "js",
//     age: 26
// }
// // ReactDom.render(<Mycom {...data}/>,document.getElementById("root"));


// // 类组件
// // 类组件和函数式组件的区别
// // 类组件内部可以拿到实例对象this，而且还可以一些额外的功能，生命周期等等等
// // props具有只读性，无论是哪种类型组件，props都不可以更改

// let data1 = {
//     name: "js1",
//     age: 10
// }

// class Mycom1 extends React.Component {
//     constructor(props){
//         super(props);
//         // 在构造函数里，是唯一可以给this.state赋初始值的地方
//         this.state = {
//             date: new Date().toLocaleTimeString()
//         }
//     }
//     // react 的生命周期 组件挂载完成之后调用
//     componentDidMount(){
//         this.$timer = setInterval(() => {
//             // setState 1、修改状态 2、重新render
//             this.setState({
//                 date: new Date().toLocaleTimeString()
//             });
//         }, 1000);
//     }
//     render(){
//         return <h1>时间：<span>{this.state.date}</span></h1> 
//     }
// }

// ReactDom.render(<Mycom1 {...data1}/>,document.getElementById("root"));

// 如何对属性进行类型校验



class Person extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        gender: PropTypes.oneOf(["male","famale"]),
        hoddy: PropTypes.arrayOf(PropTypes.string),
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    }
    render(){
        let {name,age,gender,hoddy,position} = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <td>姓名</td>
                        <td>性别</td>
                
                        <td>年龄</td>
                  
                        <td>爱好</td>
                  
                        <td>位置</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{age}</td>
                        <td>{gender}</td>
                        <td>{hoddy}</td>
                        <td>{`x:${position.x} y:${position.y}`}</td>
                    </tr>

                </tbody>
            </table>
        )
    }
}

let props = {
    name: 123,
    age: 10,
    gender: "male",
    hoddy: ["smoking","drinking"],
    position: {x:10,y:10},
    friends: [
        {name:"zhangsan",age:20},
        {name:"lisi",age:20}
    ]
}
ReactDom.render(<Person {...props} />,document.getElementById("root"));



