import { isFunction } from './utils';
import { compareTwoElements } from './vdom';

// 更新队列
export let updateQueue = {
    updaters: [],//这里面放着将要执行的更新器对象
    isPending: false,//是否处于批量更新模式，true 则处于批量更新模式
    add(updater) {
        this.updaters.push(updater);
    },
    // 批量更新，强行全部更新
    batchUpdate() {
        let { updaters } = this;
        this.isPending = true;
        let updater;
        while (updater = updaters.pop()) {
            updater.updateComponent();
        }
        this.isPending = false;
    }
}

// 更新器，专门处理更新逻辑
class Updater {
    constructor(componentInstance) {
        // Updater和类组件实例是一对一的关系
        this.componentInstance = componentInstance;
        // 批量更新，需要把分状态保存在数组里面，最后更新的时候同一合并
        this.pendingStates = [];
        this.nextProps = null;
    }
    addState(partialState) {
        this.pendingStates.push(partialState);//先把部分状态存放到数组中
        this.emitUpdate();//开始试图更新
    }
    getState() {
        let { componentInstance, pendingStates } = this;
        let { state } = componentInstance;//获取到组件的当前状态
        if (pendingStates.length > 0) {
            pendingStates.forEach(nextState => {
                if (isFunction(nextState)) {
                    state = nextState.call(componentInstance, state);
                } else {
                    state = { ...state, ...nextState };
                }
            });
        }
        pendingStates.length = 0; //用完之后清掉pendingStates
        return state;
    }
    // 传入一个新的属性对象nextProps，生命周期使用
    emitUpdate(nextProps) {
        this.nextProps = nextProps;
        if (nextProps || !updateQueue.isPending) {
            this.updateComponent();
        } else {
            updateQueue.add(this);
        }
    }
    updateComponent() {
        let { componentInstance, pendingStates, nextProps } = this;
        if (nextProps || pendingStates.length > 0) {//长度大于0说明有等待执行合并的更新状态
            shouldUpdate(componentInstance, nextProps, this.getState());

        }
    }
}

// 判断是否要更新
function shouldUpdate(componentInstance, nextProps, nextState) {
    componentInstance.props = nextProps;
    componentInstance.state = nextState;
    if (componentInstance.shouldComponentUpdate &&
        !componentInstance.shouldComponentUpdate(nextProps, nextState)) {
        // 不进行更新
        return false;
    }
    // 让组件强制更新
    componentInstance.forceUpdate();
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
    // 进行组件的实际更新
    forceUpdate() {
        console.log("forceUpdate");
        let { props, state, renderElement: oldRenderElement } = this;
        if (this.componentWillUpdate) {
            this.componentWillUpdate();
        }

        let newRenderElement = this.render();
        let currentElement = compareTwoElements(oldRenderElement, newRenderElement);
        this.renderElement = currentElement;
        if (this.componentDidUpdate) {
            this.componentDidUpdate();
        }
    }
}
// 类组件和函数组件编译之后都是函数，通过isReactComponent属性来区分类组件还是函数组件
Component.prototype.isReactComponent = {};


export default Component;