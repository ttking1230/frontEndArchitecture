import React from "./react";
import ReactDom from "./react-dom";

// let elem = <h1> title </h1>

let elem = React.createElement("h1", {
    className: "title",
    style: {
        color: "red"
    }
}, "hello", React.createElement("span", null, "react"));

function Welcome(props) {
    return React.createElement("h1", {
        className: "title",
        style: {
            color: "red"
        }
    }, "hello", React.createElement("span", null, "react"));
}
// ReactDom.render(elem, document.getElementById("root"));
// ReactDom.render(<Welcome />, document.getElementById("root"));

class Welcome1 extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return React.createElement("h1", {
            className: "title",
            style: {
                color: "red"
            }
        }, "hello1", React.createElement("span", null, "react1"));
    }
}

ReactDom.render(<Welcome1 />, document.getElementById("root"));
