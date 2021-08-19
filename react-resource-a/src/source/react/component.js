// 更新器，专门处理更新逻辑
class Updater {
    constructor(componentInstance) {
        // Updater和类组件实例是一对一的关系
        this.componentInstance = componentInstance;
        // 批量更新，需要把分状态保存在数组里面，最后更新的时候同一合并
        this.pendingState = [];
        this.nextProps = null;
    }
    addState(partialState) {
        this.pendingState.push(partialState);//先把部分状态存放到数组中
        this.emitUpdate();//开始试图更新
    }
    // 传入一个新的属性对象nextProps，生命周期使用
    emitUpdate(nextProps) {
        this.nextProps = nextProps;
    }
}

class Component {
    constructor(props) {
        this.props = props;
        this.$updater = new Updater(this);//this是类组件的实例
        this.state = {};//当前状态
        this.nextProps = null;//下一个属性对象
    }
    // 批量更新，partial：部分的意思，状态会被合并
    setState(partialState) {
        this.$updater.addState(partialState);
    }
}
// 类组件和函数组件编译之后都是函数，通过isReactComponent属性来区分类组件还是函数组件
Component.prototype.isReactComponent = {};


export default Component;