
import React from "react";
import ReactDom from "react-dom";

class ScrollList extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = {
            message: []
        }
    }
    componentDidMount() {
        // this.$timer = setInterval(() => {
        //     this.setState({
        //         message: [this.state.message.length, ...this.state.message]
        //     })
        // }, 1000);
    }
    // 在组件重新更新前获得DOM的快照，这里拿的DOM是更新前的DOM
    getSnapshotBeforeUpdate() {
        // getSnapshotBeforeUpdate 返回的值会传递给componentDidUpdate的第三个参数
        return this.container.current.scrollHeight;//返回内容的高度
    }
    componentDidUpdate(prevProps, prevState, prevScrollHeight) {
        let nextScrollTop = this.container.current.scrollTop;
        this.container.current.scrollTop = nextScrollTop + (this.container.current.scrollHeight - prevScrollHeight);
    }
    render() {
        let styleObj = {
            width: "100px",
            height: "100px",
            border: "1px solid red",
            overflow: "auto"
        }
        return (
            <div style={styleObj} ref={this.container}>
                {this.state.message.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        )
    }
}
ReactDom.render(<ScrollList />, document.getElementById("root"));


