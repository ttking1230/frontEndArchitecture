
import React from "react";
import ReactDom from "react-dom";

class Header extends React.Component {
    render() {
        return (
            <div style={{ border: `5px solid ${this.props.color}`, padding: "10px", margin: "10px" }}>
                Header
                <Title changeColor={this.props.changeColor} color={this.props.color} />
            </div>
        )
    }
}
class Title extends React.Component {
    render() {
        return (
            <div style={{ border: `5px solid ${this.props.color}`, padding: "10px", margin: "10px" }}>
                Title
            </div>
        )
    }
}
class Main extends React.Component {
    render() {
        return (
            <div style={{ border: `5px solid ${this.props.color}`, padding: "10px", margin: "10px" }}>
                Main
                <Content changeColor={this.props.changeColor} color={this.props.color} />
            </div>
        )
    }
}
class Content extends React.Component {
    render() {
        return (
            <div style={{ border: `5px solid ${this.props.color}`, padding: "10px", margin: "10px" }}>
                Content
                <button onClick={()=>this.props.changeColor("red")}>红色</button>
                <button onClick={()=>this.props.changeColor("green")}>绿色</button>
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
        return (
            <div style={{ border: `5px solid ${this.state.color}`, width: "300px", padding: "10px", margin: "10px" }}>
                Page
                <Header changeColor={this.changeColor} color={this.state.color} />
                <Main changeColor={this.changeColor} color={this.state.color} />
            </div>
        )
    }
}

ReactDom.render(<Page />, document.getElementById("root"));


