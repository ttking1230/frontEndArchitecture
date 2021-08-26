## react的项目配置文件被隐藏起来了
一般有两种方式：
1、通过rewired库修改配置
2、npm run eject 弹出配置文件，这种方式不可逆

## react项目配置文件在哪看？
node_modules -> react-scripts ->  scripts

## react key 的问题
react在dom-diff时，内部会生成一个映射表，key是遍历时传入的key，vaule是当前元素
<li key='1'>1</li>
<li key='1'>2</li>
<li key='1'>3</li>
childrenmap = {
    key: 元素
}
如果key重复，最终生成的映射表是：
childrenmap = {
    1: <li key='1'>3</li>
}
增删改元素的时候会出现问题，key为1的元素始终指向第三个li

## react17之后不再使用 React.createElement()，jsx转换规则有变化
React 17 之前，babel会进行转义，调用React.createElement生成虚拟dom
react 17 之后，require("jsx-transform")("div");单独引入个包进行转换，不再使用React.createElement
如果还想使用React.createElement，scripts需要设置变量 set DISABLE_ENV_JSX_TRANSFORM=true,
禁用jsx-transform


## react dom diff 和 vue dom diff 比较？
1、react dom diff颠倒性能很差，没做头尾比较优化。react 头移到尾性能最好的，但是尾移到头性能差。
    头移到尾：其他不动，头部直接移动到尾部。
    尾移到头：尾没有动，而是前面的元素移动到尾的后面（性能贼差）（最优解应该是尾部移动到头部，其他不动）。

2、react dom diff 要先做标记，再移动。而vue是直接更新真实节点